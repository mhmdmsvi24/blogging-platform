import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
		profile: {
			type: String,
		},
		role: {
			type: String,
			enum: ["user", "mod", "admin"],
			default: "user",
			select: false,
		},
		passwordChangedAt: Date,
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

export const UserModel = mongoose.model("User", userSchema);
