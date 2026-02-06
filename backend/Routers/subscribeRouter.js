import express from "express";

import auth from "../Middleware/authMiddleware.js";

import { newSubscriber } from "../Controller/SubscribeController.js";

const SubscribeRouter = express.Router();

SubscribeRouter.post("/newsubscription", auth, newSubscriber);

export default SubscribeRouter;
