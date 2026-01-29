import express from "express";
import {
  register,
  login,
  forgetPassword,
  verifyOTP,
  resetPassword,
} from "../Controller/authController.js";
import { upload } from "../Middleware/multerMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", upload.single("photo"), register);
authRouter.post("/login", login);
authRouter.post("/forget", forgetPassword);
authRouter.post("/verify", verifyOTP);
authRouter.post("/reset", resetPassword);

export default authRouter;
