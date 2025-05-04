import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "post title is required"],
        trim: true,
        maxLength: [50, "post title can not exceed 50 characters"],
        minLength: [10, "post title must be minimum 10 characters"]
    },
    description: {
        type: String,
        require: [true, "post description is required"],
    },
    content: {
        type: String,
        require: [true, "post must can not be without any contents"],
        minLength: [50, "post content length must be minimum 50 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: true
    },
    deleted: {
        type: Boolean,
        default: false,
        select: false
    }
});

export const PostModel = mongoose.model("Post", PostsSchema)
