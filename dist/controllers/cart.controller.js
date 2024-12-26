"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartByUserId = exports.addToCart = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, userId } = req.body;
        if (!productId || !userId) {
            res.status(400).json({ message: "productId and userId are required" });
        }
        const cartExist = yield prisma.cart.findFirst({ where: { id: userId } });
        if (cartExist) {
            const cartProduct = yield prisma.cartProduct.findFirst({
                where: {
                    AND: [{ cartId: cartExist.id }, { productId: productId }],
                },
            });
            const cartItem = yield prisma.cartProduct.create({
                data: {
                    cartId: cartExist === null || cartExist === void 0 ? void 0 : cartExist.id,
                    productId,
                },
            });
            res.status(201).json({ cartItem });
        }
        else {
            const cart = yield prisma.cart.create({
                data: {
                    userId: userId,
                },
            });
            const cartId = cart === null || cart === void 0 ? void 0 : cart.id;
            const cartItem = yield prisma.cartProduct.create({
                data: {
                    cartId,
                    productId,
                },
            });
            res.status(201).json({ cartItem });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.addToCart = addToCart;
const getCartByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ message: "userId not found" });
        }
        const cart = yield prisma.cart.findFirst({ where: { userId } });
        if (!cart) {
            res.status(400).json({ message: "cart not found" });
        }
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getCartByUserId = getCartByUserId;
