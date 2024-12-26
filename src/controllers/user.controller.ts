import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log({ user });
    res.status(200).json({ message: "User Created Successfully", user });
  } catch (error) {
    console.error(error);
    next(error); // Pass errors to Express error-handling middleware
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(500).json({ message: "Please Provide email" });
    }
    if (!password) {
      res.status(500).json({ message: "Please Provide Password" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
        role: user?.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ message: "Logged In Successfully", user });
  } catch (error) {
    console.error(error);
  }
};
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token");
  } catch (error) {
    console.error(error);
  }
};

export const resetPasswordOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Please provide Email" });
  }
  const user = prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  // Send email with password reset link

  res.json({ message: "Password reset link sent successfully" });
};
