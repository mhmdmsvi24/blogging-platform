# Shopify Clone
Fully SSR clone of Shopify with Node/Express

## Technologies

1. Node/Express
2. Nunjucks (Jinja 2): Templating
3. Tailwindcss V4
4. Prettier + Eslint: linting and formatting

## Setup

First of all fork the repo and then you need to do couple of instructions:

1. Setting up Tailwind V4: download the TW
[binaries](https://github.com/tailwindlabs/tailwindcss/releases/)

    > [!Note]
    > You need specific version of TW binaries that match your OS be aware of
    > that if it dont works

2. move TW binaries to root of the project
3. `npm install`
4. `npm run tailwindcss` for TW compiler
5. `npm run nodemon` for node server

## Project Structure

```
Shopify Clone
├─ config                       // base configuration file
├─ controllers                  // business logic for routes
├─ data
├─ middleware
├─ public                       // public dir that will be served to browser
├─ routes
├─ server.js                    // root file
├─ tailwindcss-linux-x64        // tw binary for TW compiler
├─ utils                        // utility functions
└─ views
   ├─ auth                      // auth layout
   ├─ base.html                 // root layout
   ├─ index                     // home page
   └─ layouts                   // reusable components
```
