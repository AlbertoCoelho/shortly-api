import { Router } from "express";
import userMiddleware from "../middlewares/userMiddleware.js";
import validateToken from "../middlewares/tokenMiddleware.js"
import modulesSignUpController from "../controllers/userController.js";

const userRouter = Router();

const { signUp,getUser,rankingUsers } = modulesSignUpController;

userRouter.post("/signup", userMiddleware, signUp);
userRouter.get("/users/:id", validateToken, getUser);
userRouter.get("/ranking", rankingUsers);

export default userRouter;