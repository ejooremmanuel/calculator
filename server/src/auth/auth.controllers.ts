import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { UserModel } from "../models/user.model";
import * as bcrypt from "bcrypt";
import { ErrorResponse } from "../../utils/errorResponse";
import { sign } from "jsonwebtoken";

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, password } = req.body;

    const nameExists = await UserModel.findOne({
      username: name,
    });

    if (nameExists) {
      return next(new ErrorResponse("Name already exists", 400));
    }

    if (!password) {
      return next(new ErrorResponse("add a password", 400));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await UserModel.create({
      username: name,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "user created successfully",
    });
  }
);
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, password } = req.body;

    const userExists = await UserModel.findOne({
      username: name,
    });

    if (!userExists) {
      return next(new ErrorResponse("user has not been registered yet", 400));
    }

    if (!password) {
      return next(new ErrorResponse("add a password", 400));
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      userExists?.password || ""
    );

    if (!isPasswordCorrect) {
      return next(new ErrorResponse("invalid password", 400));
    }

    return generateToken(userExists, 200, res);
  }
);

const generateToken = (user: any, statusCode: number, res: Response) => {
  const token = sign(
    {
      id: user?._id,
      username: user?.username,
    },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "60d",
    }
  );

  return res.status(200).json({
    success: true,
    token,
  });
};
