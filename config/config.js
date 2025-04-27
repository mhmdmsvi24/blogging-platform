import path from "path";
import { fileURLToPath } from "url";
import nunjucks from "nunjucks";
import express from "express";

// Create __filename and __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JS components
import { Button } from "../views/layouts/button.js";
import { Searchbar } from "../views/layouts/searchbar.js";

// Express
const app = express();
app.use(express.static(path.join(__dirname, "..", "public")));

// nunjucks config
const NJK = nunjucks.configure(path.join(__dirname, "..", "views"), {
    autoescape: true,
    express: app,
    watch: true,
});

// ui components
const compoenents = { Button, Searchbar };

// just import and add components to the components variable and it will be automatically added to globals
for (const [name, component] of Object.entries(compoenents)) {
    app.locals[name] = component;
    NJK.addGlobal(name, component);
}

export { __filename, __dirname, app };
