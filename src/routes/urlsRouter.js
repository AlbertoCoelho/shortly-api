import { Router } from "express";
import validateToken from "../middlewares/tokenMiddleware.js"
import urlMiddleware from "../middlewares/urlMiddleware.js"
import modulesUrlController from "../controllers/urlController.js";

const urlsRouter = Router();

const { createShorten,userUrl } = modulesUrlController;

urlsRouter.post("/urls/shorten", urlMiddleware, validateToken, createShorten);
urlsRouter.get("/urls/:id", userUrl);

export default urlsRouter;