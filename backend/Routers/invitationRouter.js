import express from "express";
import auth from "../Middleware/authMiddleware.js";
import {
  createInvite,
  getInvites,
} from "../Controller/invitationController.js";

const InvitaionRouter = express.Router();

InvitaionRouter.post("/sendinvite", auth, createInvite);
InvitaionRouter.get("/getinvites", auth, getInvites);

export default InvitaionRouter;
