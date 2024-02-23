const express = require("express");
const router = express.Router();
const addReview  = require("../controllers/review");

router.post("/addReview", addReview);

module.exports = router;
