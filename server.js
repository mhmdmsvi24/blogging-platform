import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 8080;

const DB = process.env.MONGODB_LOCAL;
mongoose.connect(DB).then(() => {
	// eslint-disable-next-line no-console
	console.log("---MongoDB OK---");

	app.listen(PORT, "localhost", () =>
		// eslint-disable-next-line no-console
		console.log(`---Server OK, Port: ${PORT}---`)
	);
});
