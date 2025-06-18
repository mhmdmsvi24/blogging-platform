import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: [true, "First name is required"],
			minlength: [4, "Your username must be at least 4 characters long"],
			maxlength: [16, "Your username can't exceed 16 characters"],
			trim: true,
			lowercase: true,
			unique: [true, "Username already exists"],
		},
		email: {
			type: String,
			required: [true, "Please provide your email"],
			trim: true,
			lowercase: true,
			unique: [true, "This account already exists"],
			validate: [validator.isEmail, "Invalid email address"],
		},
		profile: {
			type: String,
		},
		role: {
			type: String,
			enum: ["user", "mod", "admin"],
			default: "user",
			select: false,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must be at least 8 characters"],
			select: false,
		},
		confPassword: {
			type: String,
			required: [true, "Please confirm your password"],
			validate: {
				validator: function (el) {
					return el === this.password;
				},
				message: "Passwords do not match",
			},
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpire: Date,
	},
	{
		timestamps: true,
	}
);

// Hash password before saving
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.confPassword = undefined;
	next();
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPassword = async function (JWTTimeStamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimeStamp < changedTimeStamp;
	}

	// Not changed
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");
	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// valid for 30 minutes
	this.passwordResetExpire = Date.now() + 30 * 60 * 1000;
	return resetToken;
};

export const UserModel = mongoose.model("User", userSchema);
