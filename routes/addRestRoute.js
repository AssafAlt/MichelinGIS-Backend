const router = require("express").Router();
const { addRest } = require("../controllers/restController");

router.post("/", addRest);

module.exports = router;
