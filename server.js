import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app.js";
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 8080;

// Database
const DB = process.env.MONGODB_LOCAL;
mongoose.connect(DB).then(() => {
    // eslint-disable-next-line no-console
    console.log("---MongoDB database successfully connected---")

    app.listen(PORT, "localhost", () =>
        // eslint-disable-next-line no-console
        console.log(`Success, Port: ${PORT}`)
    );
})

