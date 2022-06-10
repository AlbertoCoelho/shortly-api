import { Router } from "express";
import validateToken from "../middlewares/tokenMiddleware.js"
import urlMiddleware from "../middlewares/urlMiddleware.js"
import modulesUrlController from "../controllers/urlController.js";

const urlsRouter = Router();

const { createShorten } = modulesUrlController;

urlsRouter.post("/urls/shorten", urlMiddleware, validateToken, createShorten);

export default urlsRouter;