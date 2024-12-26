import { Router } from "express";
import {
  allProducts,
  deleteProductById,
  postProduct,
  productById,
  updateProductById,
} from "../controllers/products.controller";

const router = Router();

router.get("/", allProducts);
router.post("/", postProduct);
router.get("/:productId", productById);
router.put("/:productId", updateProductById);
router.delete("/:productId", deleteProductById);
export default router;
