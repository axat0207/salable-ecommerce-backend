import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Invalid User" });
    }
    const isAdmin = user.role === "ADMIN";
    if (!isAdmin) {
      return res.status(403).json({ message: "User not and Admin" });
    }
    next();
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error?.message });
  }
};
