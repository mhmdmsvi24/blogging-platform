import mongoose from "mongoose";
// import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: [true, "first name is required"],
            minLength: [2, "your name must be atleast 2 characters long"],
            maxLength: [32, "you name can't exceed 32 characters"],
            trim: true
        },
        lastName: {
            type: String,
            minLength: [2, "your last name must be atleast 2 characters long"],
            maxLength: [32, "you last name can't exceed 32 characters"],
            trim: true
        },
        email: {
            type: String,
            require: [true, "Please provide your email"],
            unique: true,
            trim: true,
            lowercase: true,
            // validate: [validator.isEmail, "Invalid Email address"]
        },
        password: {
            type: String,
            require: [true, "password is required"],
            minLength: [8, "password length must be atleast 8 characters"],
        },
        confPass: {
            type: String,
            require: [true, "this field can't be empty"],
        },
        photo: {
            type: String,
            default: "https://randomphoto.io"
        }
    },
    {
        timestamps: true,
    }
)

export const UserModel = mongoose.model("User", userSchema);
