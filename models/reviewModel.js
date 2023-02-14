const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewer_name: String,
    content: {
      type: String,
      min: 3,
      max: 200,
    },
    user_rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Review", reviewSchema);
