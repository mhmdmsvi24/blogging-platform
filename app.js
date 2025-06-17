import express from "express";
import morgan from "morgan";
import path from "path";
import { __dirname } from "./utils/utils.js";
import { postsRouter } from "./routes/posts.route.js";
import { userRouter } from "./routes/user.route.js";
import { AppError } from "./utils/appError.js";
import { errorController } from "./controllers/error.controller.js";

const app = express();

// Middlewares
app.use(express.json()).use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/post", postsRouter);
app.use("/api/v1/user", userRouter);

// For invalid routes
app.all("/{*any}", (req, res, next) => {
	next(new AppError(`Invalid Route: ${req.originalUrl}`, 404));
});

// Error Handling middleware
app.use(errorController);

export default app;
