import { Router } from "express";
import { calculate, getUserCalculationHistory } from "./calculator.controller";
import { protect } from "../../middlewares/auth";

const router = Router();

router.post("/", protect, calculate);
router.get("/", protect, getUserCalculationHistory);

export { router as calculateRoute };
