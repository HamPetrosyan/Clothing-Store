import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateOrderStatus,
  userOrders,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);

// User Feauture
orderRouter.get("/userorders", authUser, userOrders);

// Verify Payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
