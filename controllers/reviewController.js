const Review = require("../models/reviewModel");
const Rest = require("../models/restModel");

const reviewHandler = async (req, res) => {
  const { reviewerName, review, restId } = req.body;
  const newReview = await new Review({
    reviewer_name: reviewerName,
    content: review,
    restaurant: restId,
  });
  await newReview.save((err) => {
    res.send(err);
  });
  const update = { reviewer_name: reviewerName, content: review };
  Rest.findOneAndUpdate(
    { _id: restId },
    { $push: { reviews: update } },

    function (err, foundRest) {
      if (err) {
        res.json(err);
      }
    }
  );
};

const getReviewsByName = async (req, res) => {
  const splittedName = req.body.splittedName;
  const reviews = await Rest.find({ name: splittedName });
  await res.status(200).json(reviews.reviews);
};

module.exports = { reviewHandler, getReviewsByName };
