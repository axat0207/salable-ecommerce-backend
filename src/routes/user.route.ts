import { Router } from "express";
import { createUser, login, logout } from "../controllers/user.controller";

const router = Router();

// Define routes
router.post("/register", createUser);
router.post("/login", login);
router.get("/logout", logout);
export default router;
