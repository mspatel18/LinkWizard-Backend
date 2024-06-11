import mongoose, { Schema } from "mongoose";

const LinkSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    links: {
      type: [{ name: String, link: String }],
      default: [],
    },
  },
  { timestamps: true }
);

export const Link = mongoose.model("Link", LinkSchema);
