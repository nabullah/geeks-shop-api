const jwt = require("jsonwebtoken");
const userModel = require("../model/core/userModel");

module.exports = {
  jwtToken: async (req, res, next) => {
    try {
      let decode = await jwt.verify(req.headers.token, "geeksshop_db");
      if (decode) {
        let userData = await userModel.findOne({
          _id: decode.userId,
          userType: "USER",
        });
        if (userData) {
          if (userData.status == "BLOCK") {
            res.send({ responseMessage: "BLOCK" });
          } else if (userData.status == "DELETE") {
            res.send({ responseMessage: "DELETE" });
          } else {
            req.userId = userData._id;
            next();
          }
        }
      }
    } catch (error) {
      return res.send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        responseResult: error.message,
      });
    }
  },
};
