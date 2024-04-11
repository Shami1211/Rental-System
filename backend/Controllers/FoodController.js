const Food = require("../Model/Food");

const getAllFoods = async (req, res, next) => {
  let foods;
  try {
    foods = await Food.find();
  } catch (err) {
    console.log(err);
  }

  if (!foods) {
    return res.status(404).json({ message: "No items found" });
  }
  return res.status(200).json({ foods });
};

const getFoodById = async (req, res, next) => {
  const id = req.params.id;
  let food;
  try {
    food = await Food.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!food) {
    return res.status(404).json({ message: "No item found" });
  }
  return res.status(200).json({ food });
};

const addFood = async (req, res, next) => {
  const { name, image, time, price, tag } = req.body;
  let food;
  try {
    food = new Food({
      name,
      image,
      time,
      price,
      tag,
    });
    await food.save();
  } catch (err) {
    console.log(err);
  }

  if (!food) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json({ food });
};

const updateFood = async (req, res, next) => {
  const id = req.params.id;
  const { name, image, time, price, tag } = req.body;
  let food;
  try {
    food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    food.name = name;
    food.image = image;
    food.time = time;
    food.price = price;
    food.tag = tag;
    await food.save();
  } catch (err) {
    console.log(err);
  }

  if (!food) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ food });
};

const deleteFood = async (req, res, next) => {
  const id = req.params.id;
  try {
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json({ message: "Food deleted successfully" });
  } catch (err) {
    
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllFoods = getAllFoods;
exports.addFood = addFood;
exports.getFoodById = getFoodById;
exports.updateFood = updateFood;
exports.deleteFood = deleteFood;
