import { PrismaClient } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
const prisma = new PrismaClient();

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { address, pincode, productId, quantity } = req.body;

    // Validate required inputs
    if (!userId || !address || !pincode || !productId || !quantity) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Set default values
    const paymentStatus = "PENDING";
    const delivered = "YET_TO_SHIPPED";

    // Create a new order
    const createOrder = await prisma.order.create({
      data: {
        userId,
        Address: address,
        pinCode: pincode,
        paymentStatus,
        delivered,
      },
    });

    // Create the order item
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: createOrder.id,
        productId,
        quantity,
        order: "CREATED",
      },
    });

    // Fetch the newly created order item with related fields
    const orderItemWithDetails = await prisma.orderItem.findUnique({
      where: {
        id: orderItem.id,
      },
      include: {
        product: {
          select: {
            name: true,
            price: true,
            images: true,
            Category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Respond with the newly created order item details
    res.status(201).json({ data: createOrder, orderItemWithDetails });
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

export const getOrderDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findFirst({
      where: { id: orderId },
      include: {
        orderItems: true,
        user: true,
        Payment: true,
      },
    });
    if (!order) {
      res.status(404).json({ message: "Order Not Found" });
      return;
    }
    res.status(200).json({ data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const payment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, amount } = req.body;
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });
    if (!order) {
      res.status(404).json({ message: "Order Not Found" });
      return;
    }
    const orderDispatch = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "SUCCESS",
        delivered: "SHIPPED",
      },
    });
    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount,
        status: "SUCCESS",
      },
    });
    res.status(200).json({ data: payment, order: orderDispatch });
  } catch (error) {
    console.error(error);
  }
};
