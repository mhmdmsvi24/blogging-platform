import catchAsync from "../utils/catchAsync.js";
import { UserModel } from "../models/users.model.js";

export const getAllUsers = catchAsync(async (req, res) => {
	const users = await UserModel.find();

	res.status(200).json({
		status: "success",
		results: users.length,
		data: {
			users,
		},
	});
});

export const updateUser = catchAsync(async () => {});
export const deleteUser = catchAsync(async () => {});
export const createUser = catchAsync(async () => {});
export const getUser = catchAsync(async () => {});
