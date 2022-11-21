const express = require("express");
const app = express();
const cors = require("cors");
require("./database/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8500;
app.use("*", cors());

/* Server Listen */
app.listen(PORT, () => {
  console.log("Server is running on Port ", PORT);
});

/* API Routers */
const userRouter = require("./router/core/userRouter");
app.use("/user", userRouter);

// Products Router
const productsRouter = require("./router/products/products");
app.use("/products", productsRouter);
