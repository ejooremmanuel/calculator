import express from "express";

import dotenv from "dotenv";
import { dbConfig } from "../config/db.config";
import { errorHandler } from "../middlewares/errorHandler";
import { authRouter } from "./auth/auth.routes";
import { calculateRoute } from "./calculator/calculator.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/calculate", calculateRoute);

app.use(errorHandler);

app.listen(4000, async () => {
  console.log(`server running on 4000`);
  await dbConfig();
});
