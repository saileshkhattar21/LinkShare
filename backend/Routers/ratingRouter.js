import express from "express";
import auth from "../Middleware/authMiddleware.js";
import { newRating } from "../Controller/ratingController.js";

const ratingRouter = express.Router();

ratingRouter.post("/userrating", auth, newRating);

export default ratingRouter;
