import express from "express";

import auth from "../Middleware/authMiddleware.js";

import {
  newSubscriber,
  deleteSubscriber,
} from "../Controller/SubscribeController.js";

const SubscribeRouter = express.Router();

SubscribeRouter.post("/newsubscription", auth, newSubscriber);
SubscribeRouter.post("/deletesubscription", auth, deleteSubscriber);

export default SubscribeRouter;
