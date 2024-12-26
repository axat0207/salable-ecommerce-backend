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
exports.updateProductById = exports.deleteProductById = exports.postProduct = exports.productById = exports.allProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield prisma.product.findMany();
        res.status(200).json({ allProducts });
    }
    catch (error) {
        console.error(error);
        res.status(403).json({ message: "Invalid or expired token." });
    }
});
exports.allProducts = allProducts;
const productById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params["productId"];
        const product = yield prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            res.status(404).json({ message: "Product Not found" });
        }
        res.status(200).json({ product });
    }
    catch (error) {
        console.error(error);
        res.status(403).json({ message: "Invalid or expired token." });
    }
});
exports.productById = productById;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, stock, price, images, Category } = req.body;
        const product = yield prisma.product.create({
            data: {
                name,
                description,
                stock,
                price,
                images,
                Category,
            },
        });
        res.status(201).json({ message: "Product created successfully", product });
    }
    catch (error) {
        console.error(error);
        res.status(403).json({ message: "Invalid or expired token." });
    }
});
exports.postProduct = postProduct;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield prisma.product.delete({ where: { id: productId } });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", product });
    }
    catch (error) {
        res.status(500).json({ message: "Product Server Error", error });
    }
});
exports.deleteProductById = deleteProductById;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { name, description, stock, price, images, Category } = req.body;
        const product = yield prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                stock,
                price,
                images,
                Category,
            },
        });
        res.status(200).json({ message: "Project updated sucellfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Product Server Error", error });
    }
});
exports.updateProductById = updateProductById;
