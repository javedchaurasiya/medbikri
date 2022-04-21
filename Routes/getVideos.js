//this is the the simple route

const router = require("express").Router();
const Video = require("../models/videos");

router.get("/", async (req, res) => {
  try {

    //getting the page no to fetch from the request body
    const { page } = req.body;

    console.log(page);
    
    //getting the latest inserted video
    const latest = await Video.find().sort({ index: -1 }).limit(1);
    const latestIndex = latest[0].index;

    //the latest added video will have the highest index. Lets Say we are sending 15 video per page then the minimum index and maximum index in a particular page (mi and ma respectievly) can be calculated as below

    let ma = latestIndex - 15 * page;
    let mi = Math.max(1, ma - 15 + 1);
    console.log(mi + " " + ma);
    
    //using range query
    const response = await Video.find({
      $and: [{ index: { $gte: mi } }, { index: { $lte: ma } }],
    }).sort({ index: -1 });
    // const response=await Video.find()
    console.log(response.length);
    
    return res.status(200).json({ videos: response });
  } catch (error) {
    
    console.log(error);
    return res.status(404).json({ error });
  }
});

module.exports = router;
