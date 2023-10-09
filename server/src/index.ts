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

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, async () => {
  console.log(`server running on ${PORT} `);

  //@: Connect database once server is running; this is so the database is not isolated
  await dbConfig();
});

//@: Handle unhandled promise rejections
process.on("unhandledRejection", (err: any, promise) => {
  console.log(`Error: ${err?.message}`);
  server.close(() => process.exit(1));
});
