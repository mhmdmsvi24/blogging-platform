import express from "express";
import {
	createPost,
	deletePost,
	getPosts,
	getSinglePost,
	patchPost,
	updatePost,
} from "../controllers/posts.controller.js";
import { protectRoute } from "../controllers/auth.controller.js";

export const postsRouter = express.Router();

postsRouter.route("/").get(getPosts).post(protectRoute, createPost);

postsRouter
	.route("/:id")
	.get(getSinglePost)
	.patch(protectRoute, patchPost) // partial update
	.put(protectRoute, updatePost) // fully update
	.delete(protectRoute, deletePost);
