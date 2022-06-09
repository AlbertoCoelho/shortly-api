import { Router } from "express";
import loginMiddleware from "../middlewares/loginMiddleware.js";
import signin from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signin", loginMiddleware, signin);

export default authRouter;