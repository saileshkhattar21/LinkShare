import mongoose from "mongoose";
import express from "express";

import auth from "../Middleware/authMiddleware.js";

import { newSubscribe } from "../Controller/SubscribeController.js";

const SubscribeRouter = express.Router();

SubscribeRouter.post("/subscription", auth, newSubscribe);

export default SubscribeRouter;
