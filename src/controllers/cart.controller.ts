import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId) {
      res.status(401).json("invalid UserID");
      return;
    }
    if (!productId) {
      res.status(400).json("Provide Cart Product");
      return;
    }
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    const cartExist = await prisma.cart.findFirst({
      where: { userId },
    });
    let cartId = cartExist?.id;
    if (!cartExist) {
      const newCart = await prisma.cart.create({
        data: { userId },
      });
      cartId = newCart.id;
    }

    if (!cartId) {
      res.status(500).json({ message: "Failed to create/find cart" });
      return;
    }
    const productExist = await prisma.cartProduct.findFirst({
      where: { productId, cartId },
    });
    if (productExist) {
      const quantityIncrese = await prisma.cartProduct.update({
        where: {
          cartId_productId: {
            cartId,
            productId,
          },
        },
        data: {
          quantity: productExist.quantity + (quantity || 1),
        },
      });
      res.status(200).json({ data: quantityIncrese });
      return;
    }
    console.log("control reaches here!!!");
    const cartProduct = await prisma.cartProduct.create({
      data: {
        cartId,
        productId,
        quantity: quantity || 1,
      },
    });

    res.status(201).json({ cartProduct });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const getCartByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(401).json("Invalid UserID");
      return;
    }
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        cartProducts: {
          include: {
            product: {
              select: {
                name: true,
                description: true,
                images: true,
              },
            },
          },
        },
      },
    });
    if (!cart) {
      res.status(404).json({ message: "Cart Not found for this User" });
      return;
    }
    res.status(200).json({ message: "Success", cart });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
    return;
  }
};
