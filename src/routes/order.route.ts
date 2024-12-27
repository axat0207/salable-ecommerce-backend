import { Router } from "express";
import {
  createOrder,
  getOrderDetail,
  payment,
} from "../controllers/order.controller";
const router = Router();

router.post("/payment", payment);
router.post("/:userId", createOrder);
router.get("/:orderId", getOrderDetail);

export default router;
