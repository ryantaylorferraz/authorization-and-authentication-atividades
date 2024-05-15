import "reflect-metadata"
import "dotenv/config";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import { userRouter } from "./routes/userRouter";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/users", userRouter)

app.use(HandleErrors.execute);