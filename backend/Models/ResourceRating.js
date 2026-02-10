import mongoose from "mongoose";
import Resource from "./Resource.js";
import User from "./Users.js";

const ResorceRating = new mongoose.Schema({
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Resource,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  score: { type: Number },
});

export default mongoose.model("Ratings", ResorceRating);
