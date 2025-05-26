import { UserModel } from "../models/users.model.js";
import catchAsync from "../utils/catchAsync.js";

export const signup = catchAsync(async (req, res) => {
	const newUser = await UserModel.create(req.body);

	res.status(201).json({
		status: "success",
		data: {
			user: newUser,
		},
	});
});
