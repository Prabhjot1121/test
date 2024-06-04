const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");

const reviewSchema = new Schema({
  reviewText: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
});

const Reviews = mongoose.model("Reviews", reviewSchema);
module.exports = Reviews;
