const productModal = require("../../model/products/products");

module.exports = {
  createProduct: async (req, res) => {
    try {
      //   let data = req.body;
      //   let saveData = await new productModal(req.body).save();
      let saveData = await new productModal({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
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
