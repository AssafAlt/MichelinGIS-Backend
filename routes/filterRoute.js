const router = require("express").Router();
const { getRestsByFilter } = require("../controllers/restController");
router.post("/", getRestsByFilter);

module.exports = router;
