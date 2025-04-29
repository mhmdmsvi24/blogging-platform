import express from "express";
import morgan from "morgan";
import path from "path";
import { __dirname } from "./utils/utils.js";
import tourRouter from "./routes/tours.route.js";
import { home_controller } from "./controllers/home.controller.js";

const app = express();

// Middlewares
app
    .use(express.json())
    .use(express.static(path.join(__dirname, "public")))

if (process.env.NODE_ENV === "production") {
    app.use(morgan("dev"));
}

// Routes
app.use("/", home_controller);
app.use("/api/v1/tours", tourRouter);

export default app;
