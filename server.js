import dotenv from "dotenv";

// eslint-disable-next-line no-unused-vars
import { __dirname } from "./config/config.js";
import { app } from "./config/config.js";

import { home_controller } from "./controllers/home.controller.js";
import { auth_controller } from "./controllers/auth.controller.js";
import { pricing_controller } from "./controllers/pricing.controller.js";

dotenv.config();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

// Express
app.use("/pricing", pricing_controller)
app.use("/", home_controller);
app.use("/auth", auth_controller);


app.listen(PORT, "localhost", () =>
    console.log(`Server has been started on port ${PORT}`)
);
