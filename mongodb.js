const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/loginSignupForm")
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("failed to connect database" , err);
  });

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("formdata", loginSchema);

module.exports = collection;
