import { Router } from "express";
import userMiddleware from "../middlewares/userMiddleware.js";
import { signUp } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", userMiddleware, signUp);

export default userRouter;