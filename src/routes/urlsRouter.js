import { Router } from "express";
import validateToken from "../middlewares/tokenMiddleware.js"
import urlMiddleware from "../middlewares/urlMiddleware.js"
import modulesUrlController from "../controllers/urlController.js";

const urlsRouter = Router();

const { createShorten,urlById,openUrl,deleteUrl } = modulesUrlController;

urlsRouter.post("/urls/shorten", urlMiddleware, validateToken, createShorten);
urlsRouter.get("/urls/:id", urlById);
urlsRouter.delete("/urls/:id", validateToken, deleteUrl);
urlsRouter.get("/urls/open/:shortUrl", openUrl);

export default urlsRouter;