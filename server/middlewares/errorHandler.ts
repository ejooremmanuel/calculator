import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/errorResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;
  // log to console for dev
  console.log(err);

  //Mongoose bad objectid
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  //mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field entered";
    error = new ErrorResponse(message, 400);
  }
  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message: string[] = Object.values(err.errors).map(
      (val: any) => val.message
    );
    error = new ErrorResponse(message?.length ? message[0] : "", 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};
