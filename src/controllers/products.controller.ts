import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const allProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await prisma.product.findMany();
    res.status(200).json({ allProducts });
  } catch (error: any) {
    console.error(error);
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

export const productById = async (req: Request, res: Response) => {
  try {
    const productId = req.params["productId"];
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      res.status(404).json({ message: "Product Not found" });
    }
    res.status(200).json({ product });
  } catch (error: any) {
    console.error(error);
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, stock, price, images, Category } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        stock,
        price,
        images,
        Category,
      },
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error: any) {
    console.error(error);
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.delete({ where: { id: productId } });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Product Server Error", error });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { name, description, stock, price, images, Category } = req.body;
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        stock,
        price,
        images,
        Category,
      },
    });
    res.status(200).json({ message: "Project updated sucellfully" });
  } catch (error) {
    res.status(500).json({ message: "Product Server Error", error });
  }
};
