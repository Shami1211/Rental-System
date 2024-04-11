const Delivery = require("../Model/Delivery");

const getAllDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find();
    if (!deliveries || deliveries.length === 0) {
      return res.status(404).json({ message: "No deliveries found" });
    }
    return res.status(200).json({ deliveries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDeliveryById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    return res.status(200).json({ delivery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addDelivery = async (req, res, next) => {
  const { location, time, status, done } = req.body;
  try {
    const newDelivery = new Delivery({
      location,
      time,
      status,
      done,
    });
    await newDelivery.save();
    return res.status(201).json({ delivery: newDelivery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add delivery" });
  }
};

const updateDelivery = async (req, res, next) => {
  const id = req.params.id;
  const { location, time, status, done } = req.body;

  try {
    const delivery = await Delivery.findByIdAndUpdate(id, {
      location,
      time,
      status,
      done,
    });
    if (!delivery) {
      return res.status(404).json({ message: "Unable to update delivery details" });
    }
    return res.status(200).json({ delivery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteDelivery = async (req, res, next) => {
  const id = req.params.id;

  try {
    const delivery = await Delivery.findByIdAndDelete(id);
    if (!delivery) {
      return res.status(404).json({ message: "Unable to delete delivery details" });
    }
    return res.status(200).json({ delivery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllDeliveries,
  getDeliveryById,
  addDelivery,
  updateDelivery,
  deleteDelivery,
};
