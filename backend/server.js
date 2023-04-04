import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to DB...");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use("/api/seed", seedRouter);

app.use("/api/products", productRouter);

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = data.products.find((item) => item._id === req.params.id);
  console.log("product ", product);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found with specified id" });
  }
});

app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(400).send({ message: "Product not found" });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
