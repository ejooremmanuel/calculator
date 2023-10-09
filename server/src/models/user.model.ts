import { Schema, Types, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "add a username"],
    },
    password: {
      type: String,
      required: [true, "add a password"],
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", UserSchema);
