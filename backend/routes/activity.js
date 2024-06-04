const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const SavedItem = require("../models/SavedItem");
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/User");
const Reviews = require("../models/Review");

// saved vendor Item like venues or other subcategory particular data
router.post("/saveItem", fetchUser, async (req, res) => {
  const savedItemData = req.body;
  const userId = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json("Unauthorized access");
    }

    const existingSavedItem = await SavedItem.findOne({
      itemId: savedItemData.itemId,
      userId: userId,
    });
    if (existingSavedItem) {
      return res.status(400).json("Item already saved by this user");
    }

    const savedItem = new SavedItem({
      userId: userId,
      userName: user.name,
      itemId: savedItemData.itemId,
      name: savedItemData.name,
      image: savedItemData.image,
      location: savedItemData.location,
      foodCategory: savedItemData.foodCategory,
      rating: savedItemData.rating,
      itemSaved: true,
    });
    const newSavedItem = await savedItem.save();
    console.log(newSavedItem);
    res.status(201).json(newSavedItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error");
  }
});

// remove savedItem from database if authorised
router.delete("/removeItem/:id", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const itemId = req.params.id;

    const user = await User.findById(userId);
    if (user) {
      const savedItem = await SavedItem.findByIdAndDelete(itemId);
      if (!savedItem) {
        return res.status(400).json("Item not found");
      }
      res.status(200).json({ message: "Item removed successfully" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error");
  }
});

// fetch saved items with authentication
router.get("/getSavedItems", fetchUser, async (req, res) => {
  const userId = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      const allSavedItems = await SavedItem.find({ userId });
      console.log(allSavedItems);
      res.status(200).json(allSavedItems);
    } else {
      return res.status(401).json("Unauthorised access");
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

// post reviews using authentication
router.post(
  "/saveReview",
  [body("itemId"), body("reviewText", "review content")],
  fetchUser,
  async (req, res) => {
    const userId = req.user.id;
    const { reviewText, itemId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), });
    }
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json("User not found");
      }
      const reviewItem = new Reviews({
        userId: userId,
        reviewText: reviewText,
        itemId: itemId,
      });

      await reviewItem.save();
      console.log(reviewItem);
      res.status(201).json(reviewItem);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal server error");
    }
  }
);

// fetch all review data
router.get("/getAllReviews", async (req, res) => {
  const errors = validationResult(req);
  const { itemId } = req.body;
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  try {
    let reviews = await Reviews.find({ itemId });
    console.log(reviews);
    res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

module.exports = router;
