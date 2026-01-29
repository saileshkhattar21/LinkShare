import mongoose from "mongoose";
import User from "./Users.js";
import Topics from "./Topics";

const ResourceSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["Document", "Link"],
      required: true,
    },

    url: {
      type: String,
      required: function () {
        return this.type === "Link";
      },
    },
    content: {
      type: String,
      required: function () {
        return this.type === "Document";
      },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
    Topic: { type: mongoose.Schema.Types.ObjectId, ref: Topics },
  },
  { timestamps: true },
);

export default mongoose.model("Resource", ResourceSchema);
