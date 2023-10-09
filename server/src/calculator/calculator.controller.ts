import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { evaluate } from "mathjs";
import { CalculatorModel } from "../models/calculator.model";

export const calculate = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const expression = evaluate(req.body.expression);

    await CalculatorModel.create({
      user: req?.user?._id,
      result: expression,
      expression: req.body.expression,
    });

    return res.status(200).json({
      success: true,
      result: expression,
      expression: req.body.expression,
      user: req.user?._id,
    });
  }
);
export const getUserCalculationHistory = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const data = await CalculatorModel.find({
      user: req?.user?._id,
    }).sort("createdAt");

    return res.status(200).json({
      success: true,
      data: data?.map((x) => ({
        result: x?.result,
        expression: x?.expression,
      })),
    });
  }
);
