const Review = require("../models/reviewModel");
const Rest = require("../models/restModel");
const url = require("url");

const reviewHandler = async (req, res) => {
  const { reviewerName, review, restId } = req.body;
  const newReview = await new Review({
    reviewer_name: reviewerName,
    content: review,
    restaurant: restId,
  });
  await newReview.save((err) => {
    return res.send(err);
  });
  const update = { reviewer_name: reviewerName, content: review };
  Rest.findOneAndUpdate(
    { _id: restId },
    { $push: { reviews: update } },

    function (err, foundRest) {
      if (err) {
        return res.json(err);
      }
    }
  );
};

const getReviewsByName = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const restId = queryObject.restId;

  const rest = await Rest.find({ _id: restId });
  console.log(rest);
  return await res.status(200).json(rest[0]?.reviews);
};

module.exports = { reviewHandler, getReviewsByName };
