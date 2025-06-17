import crypto from "crypto";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import { UserModel } from "../models/users.model.js";
import { AppError } from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import sendEmail from "../utils/mail.js";
import { createAndSendToken } from "../utils/utils.js";

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

	createAndSendToken(newUser, 204, res);
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

	createAndSendToken(user, 200, res);
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

export const forgotPassword = catchAsync(async (req, res, next) => {
	const { email } = req.body;
	const user = await UserModel.findOne({ email: email });

	if (!user) {
		return next(new AppError("Invalid Credentials", 401));
	}

	const resetToken = user.createPasswordResetToken();
	// save the token in the database
	await user.save({ validateBeforeSave: false });

	const resetURL = `${req.protocol}://${req.get("host")}/api/v1/user/resetpass/${resetToken}`;
	const message = `Forgot Your Password? Get a new one: ${resetURL}.\nIf you didn't wanted this please ignore this message`;

	try {
		await sendEmail({
			email: user.email,
			subject: "Reset Your Password",
			message,
		});

		res.status(200).json({
			status: "success",
			message: "Check your mailbox to reset your password",
		});
	} catch {
		user.passwordResetToken = undefined;
		user.passwordResetExpire = undefined;
		await user.save({ validateBeforeSave: false });

		return next(
			new AppError("Something went wrong please try again later!", 500)
		);
	}
});

export const resetPassword = catchAsync(async (req, res, next) => {
	const { token: passwordResetToken } = req.params;
	const hashedPasswordResetToken = crypto
		.createHash("sha256")
		.update(passwordResetToken)
		.digest("hex");

	const user = await UserModel.findOne({
		passwordResetToken: hashedPasswordResetToken,
		passwordResetExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new AppError("Your password reset request is invalid or has expired", 400)
		);
	}

	const { password: newPassword, passwordConfirm } = req.body;

	user.password = newPassword;
	user.confPassword = passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpire = undefined;
	await user.save();

	createAndSendToken(user, 201, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
	const { token, password, newPassword, newPasswordConfirm } = req.body;
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	const userAccount = await UserModel.findById(decoded.id).select("+password");

	if (!userAccount) {
		return next(
			new AppError(
				"Please login before attempting to change your password",
				401
			)
		);
	}

	if (!(await userAccount.correctPassword(password, userAccount.password))) {
		return next(
			new AppError(
				"Invalid Password, Please make sure your previous password is correct",
				403
			)
		);
	}

	userAccount.password = newPassword;
	userAccount.confPassword = newPasswordConfirm;
	await userAccount.save();

	createAndSendToken(userAccount, 201, res);
});
