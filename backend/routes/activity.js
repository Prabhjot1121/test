const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const SavedItem = require("../models/SavedItem");
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/User")

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

        const existingSavedItem = await SavedItem.findOne({ itemId: savedItemData.itemId, userId: userId });
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
            itemSaved: true
        });
        const newSavedItem = await savedItem.save();
        console.log(newSavedItem);
        res.status(201).json(newSavedItem);
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
        const user = await User.findById(userId)
        if (user) {
            const allSavedItems = await SavedItem.find({ userId })
            console.log(allSavedItems);
            res.status(200).json(allSavedItems)
        }
        else {
            return res.status(401).json("Unauthorised access")
        }
    } catch (error) {
        res.status(500).json("Internal server error")
    }

});

module.exports = router;
