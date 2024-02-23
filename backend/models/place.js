const mongoose = require("mongoose");
const commonType = {
  type: String,
  required: true,
  trim: true,
};
const place = new mongoose.Schema({
  name: commonType,
  state: commonType,
  city: commonType,
  info: commonType,
  weather: commonType,
  best_time_of_visit: commonType,
  image: commonType,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const PlaceModel = mongoose.model("Place", place);

module.exports = PlaceModel;
