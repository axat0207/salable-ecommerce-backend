"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            res.status(400).json({ message: "Token not found, Unauthorised" });
        }
        const decodeToekn = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log({ decodeToekn });
        req.user = decodeToekn;
        console.log(req === null || req === void 0 ? void 0 : req.user);
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};
exports.verifyJwt = verifyJwt;
