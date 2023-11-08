const userRouter = require("express").Router();
const { registerUser } = require("../controllers/user.controller");

userRouter.post("/users", registerUser);

module.exports = userRouter;
