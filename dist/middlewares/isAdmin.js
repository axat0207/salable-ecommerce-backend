"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
};
exports.isAdmin = isAdmin;
