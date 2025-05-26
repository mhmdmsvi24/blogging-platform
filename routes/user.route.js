import express from "express";
import {
	getAllUsers,
	updateUser,
	deleteUser,
	createUser,
	getUser,
} from "../controllers/user.controller.js";
import { signup } from "../controllers/auth.controller.js";

// auth controller and user controllers are separate
export const userRouter = express.Router();

// for signup it's only post method
userRouter.post("/signup", signup);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/id").get(getUser).patch(updateUser).delete(deleteUser);
