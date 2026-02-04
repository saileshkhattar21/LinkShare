import express from "express";
import auth from "../Middleware/authMiddleware.js";
import {
  acceptInvite,
  createInvite,
  getInvites,
  rejectinvite,
} from "../Controller/invitationController.js";

const InvitaionRouter = express.Router();

InvitaionRouter.post("/sendinvite", auth, createInvite);
InvitaionRouter.get("/getinvites", auth, getInvites);
InvitaionRouter.post("/acceptinvite", auth, acceptInvite);
InvitaionRouter.post("/rejectinvite", auth, rejectinvite);

export default InvitaionRouter;
