const User = require("../models/userModel");
const SellOrder = require("../models/sellOrderModel");

const createOrder = async (req, res) => {
  const { orderDetails } = req.body;
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // replace '*' with your frontend's URL in production
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  try {
    const userExist = User.findOne({ email: orderDetails.email });
    if (userExist) {
      await SellOrder.create({ ...orderDetails });
      return res
        .status(200)
        .json({ message: "Sell Order Created", code: "SellOrderCreate" });
    } else {
      return res
        .status(200)
        .json({ message: "User Not Found", code: "userNotFound" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid credentials", code: "error" });
  }
};

const updateOrder = async (req, res) => {
  const { id, updateDetails } = req.body;
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // replace '*' with your frontend's URL in production
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  try {
    const orderExist = await SellOrder.findOne({ _id: id });
    if (orderExist) {
      await SellOrder.findOneAndUpdate({ _id: id }, updateDetails);
      return res.status(200).json({
        message: "Order Updated",
        code: "OrderUpdate",
      });
    } else {
      return res
        .status(200)
        .json({ message: "Order Not Found", code: "OrderNotFound" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid credentials", code: "error" });
  }
};

const removeOrder = async (req, res) => {
  const { id } = req.body;
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // replace '*' with your frontend's URL in production
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  try {
    const orderExist = await SellOrder.findOne({ _id: id });
    if (orderExist) {
      await SellOrder.findOneAndDelete({ _id: id });
      return res
        .status(200)
        .json({ message: "order removed", code: "OrderRemoved" });
    } else {
      return res
        .status(200)
        .json({ message: "Order not found", code: "OrderNotFound" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid credentials", code: "error" });
  }
};

const getOrder = async (req, res) => {
  const id = req.params.id;
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // replace '*' with your frontend's URL in production
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  try {
    const orderExist = await SellOrder.findOne({ _id: id });
    if (orderExist) {
      return res.status(200).json({
        message: "Order Exist",
        code: "existOrder",
        order: orderExist,
      });
    } else {
      return res
        .status(200)
        .json({ message: "Order Not found", code: "notFoundOrder" });
    }
  } catch (error) {
    console.log("error", error);
    return res
      .status(401)
      .json({ message: "Invalid credentials", code: "error" });
  }
};

const getOrders = async (req, res) => {
  const email = req.params.email;
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // replace '*' with your frontend's URL in production
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  try {
    const orders = await SellOrder.find();
    if (orders) {
      const resultOrders = orders.filter((item) => item.email === email);
      return res.status(200).json({
        message: "ordersFound",
        code: "sellOrdersFound",
        orders: resultOrders,
      });
    } else {
      return res
        .status(200)
        .json({ message: "Orders not exist", code: "OrderNotExist" });
    }
  } catch (error) {
    console.log("error", error);
    return res
      .status(401)
      .json({ message: "Invalid credentials", code: "error" });
  }
};

module.exports = { createOrder, updateOrder, removeOrder, getOrder, getOrders };
