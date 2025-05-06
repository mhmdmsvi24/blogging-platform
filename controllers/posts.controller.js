import mongoose from "mongoose";
import { PostModel } from "../models/posts.model.js";

// TODO: posts related controllers probably need security patch, for sure!!!
// FIXME: these controllers send error shit to the frontend fixit
export async function getPosts(req, res) {
	const queryObj = Object.assign({}, req.query);
	const excludedFilters = ["page", "sort", "limit", "field"];

	excludedFilters.forEach((el) => {
		delete queryObj[el];
	});

	// defaults to latest posts
	const sortQuery = req.query.sort || "-createdAt";

	// pagination
	const page = req.query.page;
	const limit = req.query.limit || 32;
	const skip = (page - 1) * limit;

	try {
		let posts = [];

		posts = await PostModel.find({ ...queryObj, deleted: false })
			.skip(skip)
			.limit(limit)
			.sort(sortQuery)
			.lean();

		if (page) {
			const numPosts = await PostModel.countDocuments();

			if (numPosts <= skip) throw new Error("This Page Does Not Exits");
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
		const post = await PostModel.findOne({ _id: id, deleted: false }).lean();

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
			message: "Something went wrong",
			error: "something terribly went wrong!",
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
