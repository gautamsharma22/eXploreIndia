const express = require("express");
const router = express.Router();
const { getAllPlace, addPlace, getOnePlace } = require("../controllers/places");

router.post("/addNew", addPlace);

router.get("/getAll", getAllPlace);

router.post("/getSingle", getOnePlace);

module.exports = router;
