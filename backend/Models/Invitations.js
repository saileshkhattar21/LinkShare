import mongoose from "mongoose";
import Topics from "./Topics.js";
import User from "./Users.js";

const invitationSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topics",
      required: true,
    },

    invitedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },

    expiresAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Invitations", invitationSchema);
