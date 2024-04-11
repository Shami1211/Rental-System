const Cart = require("../Model/Cart");

const getAllCarts = async (req, res, next) => {
  let carts;
  try {
    carts = await Cart.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!carts || carts.length === 0) {
    return res.status(404).json({ message: "No items found" });
  }
  return res.status(200).json({ carts });
};

const getCartById = async (req, res, next) => {
  const id = req.params.id;
  let cart;
  try {
    cart = await Cart.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!cart) {
    return res.status(404).json({ message: "Item not found" });
  }
  return res.status(200).json({ cart });
};

const addCart = async (req, res, next) => {
  const { name, image, time, price, tag, qty, total } = req.body;
  let cart;
  try {
    cart = new Cart({
      name,
      image,
      time,
      price,
      tag,
      qty,
      total,
    });
    await cart.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  return res.status(201).json({ cart });
};

const updateCart = async (req, res, next) => {
  const id = req.params.id;
  const { name, image, time, price, tag, qty, total } = req.body;
  let cart;
  try {
    cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({ message: "Item not found" });
    }
    cart.name = name;
    cart.image = image;
    cart.time = time;
    cart.price = price;
    cart.tag = tag;
    cart.qty = qty;
    cart.total = total;
    await cart.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  return res.status(200).json({ cart });
};

const deleteCart = async (req, res, next) => {
  const id = req.params.id;
  try {
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  addCart,
  updateCart,
  deleteCart,
};
