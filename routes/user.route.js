import express from "express";
import {
	getAllUsers,
	updateUser,
	deleteUser,
	createUser,
	getUser,
} from "../controllers/user.controller.js";
import { login, protectRoute, signup } from "../controllers/auth.controller.js";

// auth controller and user controllers are separate
export const userRouter = express.Router();

// for signup it's only post method
userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter
	.route("/")
	.get(protectRoute, getAllUsers)
	.post(protectRoute, createUser);

userRouter
	.route("/id")
	.get(protectRoute, getUser)
	.patch(protectRoute, updateUser)
	.delete(protectRoute, deleteUser);
