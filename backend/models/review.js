const mongoose = require("mongoose");

const review = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  timeAdded: {
    type: Date,
    default: () => new Date(),
    required: true,
  },
});

const ReviewModel = mongoose.model("Review", review);

module.exports = ReviewModel;
