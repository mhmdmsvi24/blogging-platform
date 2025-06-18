import { fileURLToPath } from "url";
import path from "path";
import jwt from "jsonwebtoken";

// Create __filename and __dirname manually
export const __filename = fileURLToPath(import.meta.url + "/../");
export const __dirname = path.dirname(__filename);

export const signToken = (id) => {
	return jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

export const createAndSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);

	res.status(statusCode).json({
		status: "success",
		token,
	});
};
