import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./Routers/authRouter.js";
import topicRouter from "./Routers/topicRouter.js";
import resourceRouter from "./Routers/reourceRouter.js";
import subscriptionRouter from "./Routers/subscribeRouter.js";
import invitationRouter from "./Routers/invitationRouter.js";
import searchRouter from "./Routers/searchRouter.js";
import userRouter from "./Routers/userRouter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/Uploads", express.static("Uploads"));

app.use("/api/auth", authRouter);
app.use("/api/users/", userRouter);
app.use("/api/topics", topicRouter);
app.use("/api/resources", resourceRouter);
app.use("/api/subscribers", subscriptionRouter);
app.use("/api/invites", invitationRouter);
app.use("/api/searches", searchRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo DB connected");
    app.listen(5000, console.log("Server Running"));
  })
  .catch((err) => console.error(err));
