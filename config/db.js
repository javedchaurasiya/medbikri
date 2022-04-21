const mongoose = require("mongoose");
require("dotenv").config();

//connecting to my mongo client using moongoose
mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Database Connection Error");
  });
