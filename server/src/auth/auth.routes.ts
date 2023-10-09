import express from "express";
import { createUser, loginUser } from "./auth.controllers";

const router = express.Router();

router.post("/sign-up", createUser);
router.post("/login", loginUser);

export { router as authRouter};
