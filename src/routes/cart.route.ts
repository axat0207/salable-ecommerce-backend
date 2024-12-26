import express from "express";
import { addToCart, getCartByUserId } from "../controllers/cart.controller";

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getCartByUserId);

export default router;
