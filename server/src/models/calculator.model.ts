import { Schema, Types, model } from "mongoose";

const CalculatorSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    expression: {
      type: String,
      required: [true, "add an expression"],
    },
    result: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const CalculatorModel = model("Calculator", CalculatorSchema);
