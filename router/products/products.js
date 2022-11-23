const productsRouter = require("express").Router();
const productsController = require("../../controller/products/productsController");
const auth = require("../../middleware/auth");
const multer = require("multer");
// const uniqid = require("uniqid");
const path = require("path");

let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/products`);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname, path.extname(file.originalname));
    },
  }),
});

productsRouter.post("/create", upload.single("image"), function (req, res) {
  productsController.createProduct;
});
productsRouter.get("/getAllProducts", productsController.getProduct);

module.exports = productsRouter;
