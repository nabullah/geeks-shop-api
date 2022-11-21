const userRouter = require('express').Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth')
const userModel = require('../model/userModel');

userRouter.post("/signUp", userController.signUp);
userRouter.post("/login", userController.login);

module.exports = userRouter;

