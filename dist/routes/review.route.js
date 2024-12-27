"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const review_controller_1 = require("../controllers/review.controller");
router.post("/", review_controller_1.addReview);
router.get("/:productId", review_controller_1.getReviewsByProductId);
exports.default = router;
