import { Router } from "express";
import loginMiddleware from "../middlewares/loginMiddleware.js";
import signIn from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signin", loginMiddleware, signIn);

export default authRouter;