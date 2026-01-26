import express from "express"
import mongoose from  "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./Routers/authRouter.js"
import cookieParser from "cookie-parser";





dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/Uploads", express.static("Uploads"))

app.use("/api/auth", authRouter)



mongoose.connect(process.env.MONGO_URL)
        .then(()=>{console.log("Mongo DB connected");
            app.listen(5000, console.log("Server Running"))
        })
        .catch((err)=>console.error(err));


