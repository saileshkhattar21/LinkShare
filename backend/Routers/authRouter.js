import express from "express"
import {register, login} from "../Controller/authController.js"
import { auth } from "../Middleware/authMiddleware.js"
import upload from "../Middleware/multerMiddleware.js"

const authRouter = express.Router()

authRouter.post("/register", upload.single("photo"), register)
authRouter.post("/login", login)

export default authRouter;