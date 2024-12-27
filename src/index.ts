import express from "express";
import userRouter from "./routes/user.route";
import productRouter from "./routes/products.route";
import reviewRouter from "./routes/review.route";
import cartRouter from "./routes/cart.route";
import orderRouter from "./routes/order.route";
import cookieParser from "cookie-parser";
const app = express();

const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("server working great");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/order", orderRouter);
app.listen(port, () => {
  console.log("App running on port : " + port);
});
