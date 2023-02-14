const mongoose = require("mongoose");

const restSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  city: String,
  region: String,
  cuisine: String,
  url: String,
  stars: String,
  reviews: [{ reviewer_name: String, content: String }],
});

module.exports = new mongoose.model("Rest", restSchema);
