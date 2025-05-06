import mongoose from "mongoose";
import { PostModel } from "../models/posts.model.js";

// /posts
export async function getPosts(req, res) {
    try { 
        let posts = [];

        // If contains query filter it
        if (req.query) {
            posts = await PostModel.find({ ...req.query, deleted: false });
        } else {
            posts = await PostModel.find({ deleted: false });
        }


        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data: {
                message: error,
            },
        });
    }
}

export async function createPost(req, res) {
    try {
        const newPost = await PostModel.create(req.body);

        res.status(201).json({
            status: "created",
            data: {
                createdPost: newPost,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "bad request",
            message: error,
        });
    }
}

// /posts/:id
export async function getSinglePost(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid post ID format",
        });
    }

    try {
        const post = await PostModel.findOne({ _id: id, deleted: false });

        if (!post) {
            return res.status(404).json({
                status: "fail",
                message: "Post not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something went wrong",
            error: err.message,
        });
    }
}

export async function patchPost(req, res) {
    const { id } = req.params;

    try {
        const patchedPost = await PostModel.findByIdAndUpdate(id, req.body, {
            runValidators: true,
        });

        if (!patchedPost) {
            res.status(404).json({
                status: "fail",
                message: "post not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                post: patchedPost,
            },
        });
    } catch (error) {
        res.status(422).json({
            status: "invalid data or bad format",
            data: {
                message: error,
            },
        });
    }
}

// only if all the fields are changed
export async function updatePost(req, res) {
    const { id } = req.params;

    try {
        // returns new post after a full update
        const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedPost) {
            res.status(404).json({
                status: "fail",
                message: "post not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                post: updatedPost,
            },
        });
    } catch (error) {
        res.status(422).json({
            status: "invalid data or bad format",
            data: {
                message: error,
            },
        });
    }
}

export async function deletePost(req, res) {
    const { id } = req.params;

    try {
        const deletedPost = await PostModel.findOneAndUpdate(
            { _id: id, deleted: false },
            { deleted: true },
            { new: true }
        );

        if (!deletedPost) {
            res.status(404).json({
                status: "fail",
                message: "post not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(404).json({
            status: "not found",
            data: {
                message: error,
            },
        });
    }
}
