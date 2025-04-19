import http from "http";
import path from "path";
import url from "url";
import dotenv from "dotenv";

import DataBase from "./config/db.js";
import { __dirname } from "./config/config.js";
import { app } from "./config/config.js";

import { home_controller } from "./controllers/home.controller.js";
import { auth_controller } from "./controllers/auth.controller.js";
import { readFileSync } from "fs";

const db_path = path.join(__dirname, "..", "data", "db.json");
const DB = new DataBase(db_path);

dotenv.config();
const PORT = process.env.PORT || 3000;

// Express
app.use("/", home_controller);
app.use("/auth", auth_controller);

app.listen(PORT, "localhost", () =>
    console.log(`Server has been started on port ${PORT}`)
);
