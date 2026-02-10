import express from "express";
import { upload } from "../Middleware/multerMiddleware.js";
import auth from "../Middleware/authMiddleware.js";
import {
  shareDocument,
  shareLink,
  topPosts,
  subscribedPosts,
  popularPosts,
} from "../Controller/resourceController.js";

const ResourceRouter = express.Router();

ResourceRouter.post(
  "/document/share",
  auth,
  upload.single("document"),
  shareDocument,
);

ResourceRouter.post("/link/share", auth, shareLink);
ResourceRouter.get("/recommended", auth, topPosts);
ResourceRouter.get("/feed", auth, subscribedPosts);
ResourceRouter.get("/popular", auth, popularPosts);

export default ResourceRouter;
