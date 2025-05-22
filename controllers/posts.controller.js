import { PostModel } from "../models/posts.model.js";
import { PostsAPI } from "../utils/postsAPIFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";

// TODO: posts related controllers probably need security patch, for sure!!!
// FIXME: these controllers send error shit to the frontend fixit
export const getPosts = catchAsync(async (req, res) => {
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
});

export const createPost = catchAsync(async (req, res) => {
	const newPost = await PostModel.create(req.body);

	res.status(201).json({
		status: "created",
		data: {
			createdPost: newPost,
		},
	});
});

// /posts/:id
export const getSinglePost = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const post = await PostModel.findById(id).lean();

	if (!post) {
		return next(new AppError("Invalid post ID format", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			post,
		},
	});
});

export const patchPost = catchAsync(async (req, res) => {
	const { id } = req.params;

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
});

// only if all the fields are changed
export const updatePost = catchAsync(async (req, res) => {
	const { id } = req.params;

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
});

export const deletePost = catchAsync(async (req, res) => {
	const { id } = req.params;

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
});
