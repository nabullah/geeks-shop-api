const productModal = require("../../model/products/products");
const productCategoryM = require("../../model/products/productCategory");
const auth = require("../../middleware/auth");
const path = require("path").dirname("D:Download/geeks-shop-api/uploads");

module.exports = {
  createProduct: async (req, res) => {
    try {
      let saveData = await new productModal({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: path + "/" + req.file.path,
      }).save();
      if (!saveData) {
        return res.send({
          status: false,
          message: "Internal Server Error.",
          result: [],
        });
      } else {
        return res.send({
          status: true,
          message: "Product created Successfully.",
          result: saveData,
        });
      }
    } catch (error) {
      console.log(error);
      return res.send({
        status: false,
        message: error,
        result: [],
      });
    }
  },
};

module.exports = {
  getProduct: async (req, res) => {
    try {
      let products = await productCategoryM.find({
        order: [["id", "ASC"]],
      });
      if (!products) {
        return res.send({
          status: false,
          message: "No Products Found",
          result: [],
        });
      } else {
        return res.send({
          status: true,
          result: [products],
        });
      }
    } catch (error) {
      return res.send({
        status: false,
        message: error,
        result: [],
      });
    }
  },
};
