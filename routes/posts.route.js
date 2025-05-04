import express from "express";
import { createPost, deletePost, getPosts, getSinglePost, patchPost, updatePost } from "../controllers/posts.controller.js";

export const postsRouter = express.Router();

postsRouter
    .route("/")
    .get(getPosts)
    .post(createPost)

postsRouter
    .route("/:id")
    .get(getSinglePost)
    .patch(patchPost) // partial update
    .put(updatePost) // fully update
    .delete(deletePost)
