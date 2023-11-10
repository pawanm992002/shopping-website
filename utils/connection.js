const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB)
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("not connected to DB", err);
  });
