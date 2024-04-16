const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");

const savedItem = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  itemId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    ref: User,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    contentType: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  foodCategory: {
    type: {
      type: String,
      enum: ["veg", "nonVeg"],
      // required: true,
    },
    vegPlatePrice: {
      type: Number,
      required: function () {
        return this.foodCategory === "veg";
      },
    },
    nonVegPlatePrice: {
      type: Number,
      required: function () {
        return this.foodCategory === "nonVeg";
      },
    },
  },
  itemSaved: {
    type: Boolean,
    default: false,
  }
});

const SavedItem = mongoose.model("SavedItem", savedItem);
module.exports = SavedItem;