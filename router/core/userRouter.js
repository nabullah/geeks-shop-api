const userRouter = require("express").Router();
const userController = require("../../controller/core/userController");
const auth = require("../../middleware/auth");
const userModel = require("../../model/core/userModel");

userRouter.post("/signUp", userController.signUp);
userRouter.post("/login", userController.login);

module.exports = userRouter;
