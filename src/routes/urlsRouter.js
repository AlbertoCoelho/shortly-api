import { Router } from "express";
import validateToken from "../middlewares/tokenMiddleware.js"
import urlMiddleware from "../middlewares/urlMiddleware.js"
import modulesUrlController from "../controllers/urlController.js";

const urlsRouter = Router();

const { createShorten,urlByUserId,openUrl } = modulesUrlController;

urlsRouter.post("/urls/shorten", urlMiddleware, validateToken, createShorten);
urlsRouter.get("/urls/:id", urlByUserId);
urlsRouter.get("/urls/open/:shortUrl", openUrl);

export default urlsRouter;