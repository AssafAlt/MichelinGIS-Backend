const router = require("express").Router();
const {
  reviewHandler,
  getReviewsByName,
} = require("../controllers/reviewController");

router.post("/addreview", reviewHandler);
router.post("/allreviews", getReviewsByName);

module.exports = router;
