import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 8080;

process.on("uncaughtException", (err) => {
	// eslint-disable-next-line no-console
	console.log("uncaughtException:", err.name, err.message);
});

const DB = process.env.MONGODB_LOCAL;
let server;
mongoose.connect(DB).then(() => {
	// eslint-disable-next-line no-console
	console.log("---MongoDB OK---");
	server = app.listen(PORT, "localhost", () =>
		// eslint-disable-next-line no-console
		console.log(`---Server OK, Port: ${PORT}---`)
	);
});

// shutdown the app on critical errors
process.on("unhandledRejection", (err) => {
	// eslint-disable-next-line no-console
	console.log("unhandledRejection:", err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
