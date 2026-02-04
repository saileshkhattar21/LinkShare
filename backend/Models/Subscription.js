import mongoose from "mongoose";
import User from "./Users.js";
import Topics from "./Topics.js";

const SubscriptionSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Topics,
      required: true,
    },

    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    seriousness: {
      type: String,
      enum: ["Serious", "Very Serious", "Casual"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Subscription", SubscriptionSchema);
