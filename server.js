import path from "path";
import dotenv from "dotenv";
import nunjucks from "nunjucks";

import { __dirname } from "./utils/utils.js";

// JS components
import { Button } from "./views/layouts/button.js";
import { Searchbar } from "./views/layouts/searchbar.js";
import { PricingCards } from "./views/layouts/pricing-cards.js";

import app from "./app.js";

dotenv.config({ path: "./config.env" });
 
const PORT = process.env.PORT || 8080;

// nunjucks config
const NJK = nunjucks.configure(path.join(__dirname, "views"), {
    autoescape: true,
    express: app,
    watch: true,
});

// ui components
const compoenents = { Button, Searchbar, PricingCards };

// just import and add components to the components variable and it will be automatically added to globals
for (const [name, component] of Object.entries(compoenents)) {
    app.locals[name] = component;
    NJK.addGlobal(name, component);
}

app.listen(PORT, "localhost", () =>
    console.log(`Success, Port: ${PORT}`)
);
