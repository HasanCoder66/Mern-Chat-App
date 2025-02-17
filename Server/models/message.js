import { mongoose, Schema, model, models, Types } from "mongoose";

const schema = new Schema(
  {
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

export const Message = models.Message || model("Message", schema);
