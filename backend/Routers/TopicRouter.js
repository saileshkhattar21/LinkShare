import express from "express"
import auth from "../Middleware/authMiddleware.js"
import { getTopic, createTopic } from "../Controller/topicController.js"

const TopicRouter = express.Router()

TopicRouter.post("/create", auth, createTopic)
TopicRouter.get("/all",auth, getTopic)

export default TopicRouter
