const productsRouter = require("express").Router();
const productsController = require("../../controller/products/productsController");
const auth = require("../../middleware/auth");

productsRouter.post("/create", productsController.createProduct);
// userRouter.post("/login", userController.login);

module.exports = productsRouter;
