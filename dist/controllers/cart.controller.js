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
        const { userId, productId, quantity } = req.body;
        if (!userId) {
            res.status(401).json("invalid UserID");
            return;
        }
        if (!productId) {
            res.status(400).json("Provide Cart Product");
            return;
        }
        const product = yield prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        const cartExist = yield prisma.cart.findFirst({
            where: { userId },
        });
        let cartId = cartExist === null || cartExist === void 0 ? void 0 : cartExist.id;
        if (!cartExist) {
            const newCart = yield prisma.cart.create({
                data: { userId },
            });
            cartId = newCart.id;
        }
        if (!cartId) {
            res.status(500).json({ message: "Failed to create/find cart" });
            return;
        }
        const productExist = yield prisma.cartProduct.findFirst({
            where: { productId, cartId },
        });
        if (productExist) {
            const quantityIncrese = yield prisma.cartProduct.update({
                where: {
                    cartId_productId: {
                        cartId,
                        productId,
                    },
                },
                data: {
                    quantity: productExist.quantity + (quantity || 1),
                },
            });
            res.status(200).json({ data: quantityIncrese });
            return;
        }
        console.log("control reaches here!!!");
        const cartProduct = yield prisma.cartProduct.create({
            data: {
                cartId,
                productId,
                quantity: quantity || 1,
            },
        });
        res.status(201).json({ cartProduct });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.addToCart = addToCart;
const getCartByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(401).json("Invalid UserID");
            return;
        }
        const cart = yield prisma.cart.findFirst({
            where: { userId },
        });
        if (!cart) {
            res.status(404).json({ message: "Cart Not found for this User" });
            return;
        }
        res.status(200).json({ message: "Success", cart });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
        return;
    }
});
exports.getCartByUserId = getCartByUserId;
