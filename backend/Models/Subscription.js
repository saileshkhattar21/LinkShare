import mongoose from "mongoose";
import User from "./Users.js";
import Topics from "./Topics.js";

const SubscriptionSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Topics,
    },

    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    seriousness: {
      type: String,
      enum: ["Serious", "Very Serious", "Casual"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Subscription", SubscriptionSchema);
