"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// Define routes
router.post("/register", user_controller_1.createUser);
router.post("/login", user_controller_1.login);
router.get("/logout", user_controller_1.logout);
exports.default = router;
