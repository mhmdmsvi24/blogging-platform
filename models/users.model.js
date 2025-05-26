import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			require: [true, "First name is required"],
			minLength: [4, "Your username must be atleast 2 characters long"],
			maxLength: [16, "You username can't exceed 32 characters"],
			trim: true,
			lowercase: true,
		},
		email: {
			type: String,
			require: [true, "Please provide your email"],
			unique: true,
			trim: true,
			lowercase: true,
			validate: [validator.isEmail, "Invalid Email address"],
		},
		password: {
			type: String,
			require: [true, "Password is required"],
			minLength: [8, "Password length must be atleast 8 characters"],
		},
		confPassword: {
			type: String,
			require: [true, "Please confirm your pasasword"],
			// this only works for creating objects not updating them (onsave)
			validate: {
				validator: function (el) {
					return el === this.password;
				},
				message: "Invalid confirmed password",
			},
		},
		profile: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.confPassword = undefined;
	next();
});

export const UserModel = mongoose.model("User", userSchema);
