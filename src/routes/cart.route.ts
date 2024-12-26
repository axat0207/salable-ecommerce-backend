import { Router } from "express";
import { addToCart, getCartByUserId } from "../controllers/cart.controller";
const router = Router();

router.post("/", addToCart);
router.get("/", getCartByUserId);

export default router;
