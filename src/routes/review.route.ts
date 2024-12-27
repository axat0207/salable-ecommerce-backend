import { Router } from "express";
const router = Router();
import {
  addReview,
  getReviewsByProductId,
} from "../controllers/review.controller";

router.post("/", addReview);
router.get("/:productId", getReviewsByProductId);

export default router;
