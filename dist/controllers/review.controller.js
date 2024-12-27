"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByProductId = exports.addReview = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, userId, rating, content } = req.body;
        if (!productId) {
            res.status(401).json("Invalid Product ID");
            return;
        }
        if (!userId) {
            res.status(401).json("Invalid User ID");
            return;
        }
        if (rating < 1 || rating > 5) {
            res.status(400).json("Invalid Rating");
            return;
        }
        const review = yield prisma.review.create({
            data: {
                productId,
                userId,
                rating,
                content,
            },
        });
        res.status(201).json(review);
        res.status(500).json({ message: "Something went wrong!!!" });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!!!" });
        return;
    }
});
exports.addReview = addReview;
const getReviewsByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        if (!productId) {
            res.status(401).json("Invalid Product ID");
            return;
        }
        const review = yield prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: "desc" },
        });
        const averageRatig = yield prisma.review.aggregate({
            _avg: { rating: true },
            where: { productId },
        });
        res.status(200).json({ review, averageRatig });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!!!" });
        return;
    }
});
exports.getReviewsByProductId = getReviewsByProductId;
