const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTEAPI";
const {} = require("express");
const { Schema } = require("mongoose");

module.exports = {
  /*. 1. Create an ApI for SignUp */
  signUp: async (req, res) => {
    try {
      // Existing User Check
      let result = await userModel.findOne({
        email: req.body.email,
        status: { $ne: "DELETE" },
      });
      if (result) {
        return res.send({
          code: 409,
          message: "Email Already Exist.",
          result: [],
        });
      } else {
        let user_name = req.body.userName;
        let mobile = req.body.mobile;
        let password = req.body.password;
        req.body.password = bcrypt.hashSync(password);
        let userSave = await new userModel(req.body).save();
        if (!userSave) {
          return res.send({
            code: 500,
            message: "Internal Server Error.",
            result: [],
          });
        } else {
          let token = jwt.sign(
            { email: req.body.email, id: userModel._id },
            SECRET_KEY
          );
          return res.send({
            code: 200,
            message: "SignUp Done Successfully !!!",
            result: userSave,
            token: token,
          });
        }
      }
    } catch (error) {
      return res.send({
        code: 501,
        message: "Something went wrong, Please try again",
        result: error.message,
      });
    }
  },

  /*. 1. Create an ApI for SignUp */
  login: async (req, res) => {
    try {
      let query = {
        $and: [
          { email: req.body.email },
          { status: { $ne: "DELETE" } },
          { userType: "USER" },
        ],
      };

      let userResult = await userModel.findOne(query);
      if (!userResult) {
        return res.send({
          code: 404,
          message: "User Not Found.",
          result: [],
        });
      } else {
        if (req.body.email != userResult.email) {
          return res.send({
            code: 401,
            message: "Incorrect EmailId.",
          });
        } else {
          let passCheck = bcrypt.compareSync(
            req.body.password,
            userResult.password
          );
          if (passCheck == false) {
            return res.send({
              code: 401,
              message: "Incorrect password.",
            });
          } else {
            /* API for User Authentication*/
            console.log(userResult);
            let data = {
              userId: userResult._id,
              user: userResult.userName,
              email: userResult.email,
              mobile: userResult.mobile,
              status: userResult.status,
              userType: userResult.userType,
            };
            let token = jwt.sign(data, "test", { expiresIn: "1h" });
            return res.send({
              code: 200,
              message: "Login Done Successfully !!!",
              result: [{ token: token }, { user: data }],
            });
          }
        }
      }
    } catch (error) {
      return res.send({
        code: 500,
        message: "Something went wrong, please try again!",
        result: error.message,
      });
    }
  },
};
