const express = require("express");
const Restaurant = require("../models/restaurantModel");
const router = express.Router();

// http://localhost:3000/restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// http://localhost:3000/restaurants/cuisine/:cuisine
router.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  const cuisine = req.params.cuisine;
  try {
    const restaurants = await Restaurant.find({ cuisine: cuisine });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC
router.get("/restaurants", async (req, res) => {
  const sortBy = req.query.sortBy || "ASC";
  try {
    const restaurants = await Restaurant.find({})
      .select("address city cuisine name restaurant_id")
      .sort({ restaurant_id: sortBy === "ASC" ? 1 : -1 });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// http://localhost:3000/restaurants/Delicatessen
router.get("/restaurants/:cuisine", async (req, res) => {
  const cuisine = req.params.cuisine;

  try {
    const restaurants = await Restaurant.find({
      cuisine: cuisine,
      city: { $ne: "Brooklyn" },
    })
      .select("cuisine name city -_id")
      .sort({ name: 1 });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;