import { Router } from "express";
import { container } from "tsyringe";
import { UserService } from "../services/userService";
import { userControllers } from "../controllers/userController";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isEmailAlreadyRegistered } from "../middlewares/isEmailAlreadyRegistered.middleware";

container.registerSingleton("UserService", UserService);

const UserControllers = container.resolve(userControllers)

export const userRouter = Router();

userRouter.post("/", isEmailAlreadyRegistered.execute, (req, res) => UserControllers.register(req, res))
userRouter.post("/login", (req, res) => UserControllers.login(req, res))
userRouter.get("/", verifyToken.execute, (req, res) => UserControllers.getUser(req, res))