import { UserModel } from "../models/users.model";

export async function sighup(res) {
	const newUser = UserModel.create(res.body);

	res.status(201).json({
		status: "success",
		data: {
			user: newUser,
		},
	});
}
