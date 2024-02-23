const Place = require("../models/place");
const getAllPlace = async (req, res) => {
  const places = await Place.find().populate({
    path: "reviews",
    populate: {
      path: "author",
      model: "User",
      select: "-password -email -__v",
    },
  });
  res.status(200).json(places);
};

const getOnePlace = async (req, res) => {
  const { placeID } = req.body;
  if (!placeID)
    return res.status(404).send({
      message: "Please Send Valid Place ID",
    });
  const places = await Place.findOne({ name: placeID }).populate({
    path: "reviews",
    populate: {
      path: "author",
      model: "User",
      select: "-password -email -__v",
    },
  });
  res.status(200).json(places);
};

const addPlace = async (req, res) => {
  const { name, state, city, info, weather, best_time_of_visit, image } =
    req.body;
  const newPlace = new Place({
    name,
    state,
    city,
    info,
    weather,
    best_time_of_visit,
    image,
  });
  try {
    const result = await newPlace.save();
    res.send({
      message: "Place Saved",
    });
  } catch (err) {
    res.status(500).send({
      message: "Error While Adding Place",
      error: err,
    });
  }
};

module.exports = { getAllPlace, addPlace, getOnePlace };
