const express = require("express");
const router = express.Router();
const Food = require("../Model/Food");
const foodController = require("../Controllers/FoodController");

router.get("/", foodController.getAllFoods);
router.post("/", foodController.addFood);
router.get("/:id", foodController.getFoodById);
router.put("/:id", foodController.updateFood);
router.delete("/:id", foodController.deleteFood);

module.exports = router;
