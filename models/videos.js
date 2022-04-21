const mongoose = require("mongoose");

//defining a simple schema for the video document.
const mySchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    channelId: {
      type: String,
      required: true,
    },
    channelName: {
      type: String,
      required: true,
    },
    videoTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbURL: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);




module.exports = mongoose.model("Video", mySchema);
