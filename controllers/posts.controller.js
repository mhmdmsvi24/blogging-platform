import mongoose from "mongoose";
import { PostModel } from "../models/posts.model.js";
import { PostsAPI } from "../utils/postsAPIFeatures.js";

// TODO: posts related controllers probably need security patch, for sure!!!
// FIXME: these controllers send error shit to the frontend fixit
export async function getPosts(req, res) {
    try {
        const postsQuery = new PostsAPI(req.query, PostModel.find())
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const posts = await postsQuery.DBQuery.lean();

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
    } catch {
        res.status(404).json({
            status: "bad request",
            message: "something terribly went wrong!",
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
        const post = await PostModel.findById(id).lean();

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
    } catch {
        res.status(500).json({
            status: "error",
            data: {
                message: "Something terrilbly went wrong",
            },
        });
    }
}

export async function patchPost(req, res) {
    const { id } = req.params;

    try {
        const patchedPost = await PostModel.findByIdAndUpdate(id, req.body, {
            runValidators: true,
        }).lean();

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
    } catch {
        res.status(422).json({
            status: "invalid data or bad format",
            data: {
                message: "something terribly went wrong!",
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
        }).lean();

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
    } catch {
        res.status(422).json({
            status: "invalid data or bad format",
            data: {
                message: "something terribly went wrong!",
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
        ).lean();

        if (!deletedPost) {
            res.status(404).json({
                status: "fail",
                message: "post not found",
            });
        }

        res.status(204).send();
    } catch {
        res.status(404).json({
            status: "not found",
            data: {
                message: "something terribly went wrong!",
            },
        });
    }
}
