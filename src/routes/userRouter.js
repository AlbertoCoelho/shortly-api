import { Router } from "express";
import schemaValidator from "../middlewares/schemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";
import validateToken from "../middlewares/tokenMiddleware.js"
import modulesSignUpController from "../controllers/userController.js";

const userRouter = Router();

const { signUp,getUser,rankingUsers } = modulesSignUpController;

userRouter.post("/signup", schemaValidator(userSchema), signUp);
userRouter.get("/users/:id", validateToken, getUser);
userRouter.get("/ranking", rankingUsers);

export default userRouter;