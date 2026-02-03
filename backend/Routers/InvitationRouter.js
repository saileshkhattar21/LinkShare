import express from "express";
import auth from "../Middleware/authMiddleware.js";
import { createInvite } from "../Controller/InvitationController.js";

const InvitaionRouter = express.Router();

InvitaionRouter.post("/invite", auth, createInvite);

export default InvitaionRouter;
