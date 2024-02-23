const Review = require("../models/review");
const Place = require("../models/place");

const addReview = async (req, res) => {
  const { userID, comment, PlaceID } = req.body;
  try {
    const newReview = new Review({ author: userID, comment });
    const result = await newReview.save();

    const place = await Place.findById(PlaceID);

    if (place) {
      place.reviews.push(newReview._id);
      await place.save();
      res.status(201).json({ message: "Review added successfully" });
    } else {
      res.status(404).json({ message: "Place not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addReview;
