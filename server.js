const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();



const PORT = process.env.PORT | 2000;

//connecting to my DB
require("./config/db.js");

const Video = require("./models/videos");



const corsoptions = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
};

//for cross origin requests
app.use(cors(corsoptions));

app.use(express.json());


//using epxress router as middleware to keep the code structure clean
app.use("/getVideos", require("./Routes/getVideos.js"));
app.use("/search", require("./Routes/search.js"));


//defining a dummy route
app.get("/", (req, res) => {
  return res.status(200).send("Hello from home");
});


//fething latest yt videos every 10 seconds using axios.
setInterval(() => {

  const fetchVideo = async () => {

    console.log("Fetching Video");
    
    try {

      //getting the lastest inserved video
      const response = await Video.find().sort({ index: -1 }).limit(1);
      let ind = 0;
      let videoId = "";

      if (response.length > 0) {
        ind = response[0].index;
        videoId = response[0].videoId;
      }
      ind++;

      //Url to fetch from
      const URL =
        "https://www.googleapis.com/youtube/v3/search?key=" +
        process.env.YTKEY +
        "&type=video&part=snippet&maxResults=50&q=game&order=date";

      const result = await axios.get(URL);
      const videos = result.data.items;
      let i = 0;
      

      //after the data is fetched, i am adding only that videos which are published after my latest inserted video in database.
      for (i = 0; i < 50; i++) {
        if (videoId == videos[i].id.videoId) break;
      }
      let temp = i - 1;
      let added = 0;

      for (i = temp; i >= 0; i--) {
       
       //making a new instance of the Video model and then saving it.
        const video = new Video({
          index: added + ind,
          videoId: videos[i].id.videoId,
          channelId: videos[i].snippet.channelId,
          channelName: videos[i].snippet.channelTitle,
          videoTitle: videos[i].snippet.title,
          description: videos[i].snippet.description,
          thumbURL: videos[i].snippet.thumbnails.medium.url,
          publishedAt: videos[i].snippet.publishedAt,
        });
        added++;

        
        const insertVideoToDB = await video.save();
        // console.log("Data Inserted "+ insertVideoToDB);
      }
      console.log(`Added ${added} new videos to DB`);
    } catch (error) {
      
      //The most common error right now is quota exhausted.
      console.log("Error");
      console.log(error.response.data.error.message);
    }
  };

  
  fetchVideo();
}, 10000);


//starting the server
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
