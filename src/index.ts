import express from "express";
import userRouter from "./routes/user.route";
import productRouter from "./routes/products.route";
import cartRouter from "./routes/cart.route";
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
app.listen(port, () => {
  console.log("App running on port : " + port);
});
