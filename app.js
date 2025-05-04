import express from "express";
import morgan from "morgan";
import path from "path";
import { __dirname } from "./utils/utils.js";
import { postsRouter } from "./routes/posts.route.js";

const app = express();

// Middlewares
app
    .use(express.json())
    .use(express.static(path.join(__dirname, "public")))

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/posts", postsRouter)

export default app;
