import express from "express";
import cors from "cors";
import data from "./data";
import mongoose from "mongoose";
import config from "./config";
import userRouter from "./routers/userRouter";

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));
const app = express();

app.use(cors());
app.use('/api', userRouter)
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
