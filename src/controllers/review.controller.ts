import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const addReview = async (req: Request, res: Response): Promise<void> => {
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
    const userAlreadyReviwed = await prisma.review.findFirst({
      where: { userId },
    });
    if (userAlreadyReviwed) {
      res
        .status(400)
        .json({ message: "User has already reviewed this product" });
      return;
    }
    const review = await prisma.review.create({
      data: {
        productId,
        userId,
        rating,
        content,
      },
    });

    res.status(201).json(review);

    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!!!" });
    return;
  }
};
export const getReviewsByProductId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    if (!productId) {
      res.status(401).json("Invalid Product ID");
      return;
    }
    const review = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });
    const averageRatig = await prisma.review.aggregate({
      _avg: { rating: true },
      where: { productId },
    });
    res.status(200).json({ review, averageRatig });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!!!" });
    return;
  }
};
