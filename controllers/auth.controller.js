import { UserModel } from "../models/users.model.js";
import { AppError } from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = (id) => {
	return jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

export const signup = catchAsync(async (req, res, next) => {
	const { userName, email, password, confPassword } = req.body;

	if (!userName || !email || !password || !confPassword) {
		return next(new AppError("Invalid Credentials", 400));
	}

	const newUser = await UserModel.create({
		userName,
		email,
		password,
		confPassword,
	});
	const token = signToken(newUser._id);

	res.status(201).json({
		status: "success",
		token,
		data: {
			user: newUser,
		},
	});
});

export const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError("Please provide email & password", 400));
	}

	const user = await UserModel.findOne({ email }).select("+password");
	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError("Invalid Credentials"), 401);
	}

	const token = signToken(user._id);

	res.status(200).json({
		status: "success",
		token,
	});
});

// route protect middleware
export const protectRoute = catchAsync(async (req, res, next) => {
	// check if use have a token
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return next(new AppError("You're not logged in, please login.", 401));
	}

	// verify token and retirive user id
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	const freshUser = await UserModel.findById(decoded.id).select("+role");

	// if user does not exist then it's probably deleted account
	if (!freshUser) {
		return next(new AppError("Invalid user, please login", 401));
	}

	// prvide (Issued At) parameter to the function to see if it's the latest valid token
	if (freshUser.passwordChangedAt(decoded.iat)) {
		return next(new AppError("Invalid user credentials, please login", 401));
	}

	// IF passed all conditions grant access
	req.user = freshUser;
	next();
});

/**
 * Restrict Access to certain roles
 */
export const restrictTo = catchAsync(async (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError("You Don't have premission to perform this action", 403)
			);
		}

		next();
	};
});
