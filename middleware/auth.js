const jwt = require("jsonwebtoken");
const userModel = require("../model/core/userModel");
const SECRET_KEY = "NOTEAPI";
module.exports = {
  jwtToken: async (req, res, next) => {
    try {
      let token1 = req.headers["authorization"];
      let token2 = token1.split(" ")[1];
      console.log(token2);

      let token = jwt.verify(token2, SECRET_KEY);
      if (token) {
        let userData = await userModel.findOne({
          _id: token.userId,
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
