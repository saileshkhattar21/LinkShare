import express from "express";
import { upload } from "../Middleware/multerMiddleware.js";
import auth from "../Middleware/authMiddleware.js";
import { shareDocument } from "../Controller/resourceController.js";

const ResourceRouter = express.Router();

ResourceRouter.post(
  "/document/share",
  auth,
  upload.single("document"),
  shareDocument,
);

ResourceRouter.post("/link/share", shareLink);

export default ResourceRouter;
