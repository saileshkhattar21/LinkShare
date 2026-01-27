import express from "express"
import {register, login, forgetPassword} from "../Controller/authController.js"
import upload from "../Middleware/multerMiddleware.js"
import auth  from "../Middleware/authMiddleware.js"

const authRouter = express.Router()

authRouter.post("/register", upload.single("photo"), register)
authRouter.post("/login", login)
authRouter.post("/forget", auth, forgetPassword)

export default authRouter;