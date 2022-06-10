import { Router } from "express";
import validateToken from "../middlewares/tokenMiddleware.js"
import schemaValidator from "../middlewares/schemaMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";
import modulesUrlController from "../controllers/urlController.js";

const urlsRouter = Router();

const { createShorten,urlById,openUrl,deleteUrl } = modulesUrlController;

urlsRouter.post("/urls/shorten", schemaValidator(urlSchema), validateToken, createShorten);
urlsRouter.get("/urls/:id", urlById);
urlsRouter.delete("/urls/:id", validateToken, deleteUrl);
urlsRouter.get("/urls/open/:shortUrl", openUrl);

export default urlsRouter;