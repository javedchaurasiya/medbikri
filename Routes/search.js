const router = require("express").Router();
const Video = require("../models/videos");

router.post("/", async (req, res) => {
  try {

    //getting the query from the request body
    let { title, description, page } = req.body;
    if (!description) description = title;

    //sending 10 videos per page
    let skipped = 10 * page;

    //Searching using reg. expression
    const regExTitle = new RegExp(title.split("").join("\\s*"));
    const regExDesc = new RegExp(description.split("").join("\\s*"));
    console.log(regExTitle);

    //getting total search results so that i can know the total no of pages in my DB.
    const countResponse = await Video.find({
      $or: [
        { videoTitle: { $regex: regExTitle, $options: "xi" } },
        { description: { $regex: regExDesc, $options: "xi" } },
      ],
    }).count();

    //searching => getting all results => sorting on the basis of index (highest index===latest video) => skipping results to move to desired page => Limitting to 10 videos.
    const response = await Video.find({
      $or: [
        { videoTitle: { $regex: regExTitle, $options: "xi" } },
        { description: { $regex: regExDesc, $options: "xi" } },
      ],
    })
      .sort({ index: -1 })
      .skip(skipped)
      .limit(10);

    console.log(response.length);
    
    return res
      .status(200)
      .json({
        videos: response,
        totalPages: Math.trunc((countResponse + 9) / 10),
      });

  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
});

module.exports = router;
