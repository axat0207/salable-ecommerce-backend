import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.body;
    if (!productId || !userId) {
      res.status(400).json({ message: "productId and userId are required" });
    }

    const cartExist = await prisma.cart.findFirst({ where: { id: userId } });
    if (cartExist) {
      const cartProduct = await prisma.cartProduct.findFirst({
        where: {
          AND: [{ cartId: cartExist.id }, { productId: productId }],
        },
      });

      const cartItem = await prisma.cartProduct.create({
        data: {
          cartId: cartExist?.id,
          productId,
        },
      });
      res.status(201).json({ cartItem });
    } else {
      const cart = await prisma.cart.create({
        data: {
          userId: userId,
        },
      });
      const cartId = cart?.id;
      const cartItem = await prisma.cartProduct.create({
        data: {
          cartId,
          productId,
        },
      });
      res.status(201).json({ cartItem });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getCartByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: "userId not found" });
    }
    const cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) {
      res.status(400).json({ message: "cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error });
  }
};
