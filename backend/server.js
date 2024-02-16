import express from "express";
import cors from "cors";
import data from "./data";
import mongoose from "mongoose";
import config from "./config";
import userRouter from "./routers/userRouter";
import bodyParser from "body-parser";
import orderRouter from "./routers/orderRouter";

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
