import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ErrorResponse } from "../utils/errorResponse";
import { UserModel } from "../src/models/user.model";
import { asyncHandler } from "./asyncHandler";

export const protect = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }

    let token = req.headers.authorization
      ? (req.headers.authorization as unknown as string)?.split(" ")
      : "";

    if (token.length) {
      const decoded = verify(token[1], "secret", {
        ignoreExpiration: true,
      }) as any;

      req.user = await UserModel.findById(decoded?.id);

      next();
    } else {
      next(new ErrorResponse("no token provided", 401));
    }
  }
);
