"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const products_route_1 = __importDefault(require("./routes/products.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 7000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("server working great");
});
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/products", products_route_1.default);
app.use("/api/v1/cart", cart_route_1.default);
app.listen(port, () => {
    console.log("App running on port : " + port);
});
