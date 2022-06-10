import { Router } from "express";
import schemaValidator from "../middlewares/schemaMiddleware.js";
import loginSchema from "../schemas/loginSchema.js";
import signIn from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signin", schemaValidator(loginSchema), signIn);

export default authRouter;