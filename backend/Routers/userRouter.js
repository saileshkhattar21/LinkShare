import express from "express";
import auth from "../Middleware/authMiddleware.js";
import { getUserDetails } from "../Controller/userController.js";

const userRouter = express.Router();

userRouter.get("/getuserdetails", auth, getUserDetails);

export default userRouter;
