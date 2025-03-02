import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    // groupChat: {
    //   type: Boolean,
    //   default: false,
    // },
    content: String,
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    attachments: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    chat: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.models.Message || model("Message", schema);
