import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface to include cookies
declare global {
  namespace Express {
    interface Request {
      cookies: { [key: string]: string };
      user?: any;
    }
  }
}

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      res.status(400).json({ message: "Token not found, Unauthorised" });
    }
    const decodeToekn = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log({ decodeToekn });
    req.user = decodeToekn;
    console.log(req?.user);
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
