import nunjucks from "nunjucks";
import { Button } from "./button.js";

export function Searchbar() {
    const html = `
        <div class="flex bg-white rounded-full border border-black/20 overflow-hidden my-5 p-1
         focus-within:border-blue-500 transition-colors max-w-[900px]">
            <input class="px-4 w-full rounded-full focus:outline-0 focus:placeholder:text-xs
                focus:placeholder:translate-y-[-17px] placeholder:transition-all focus:placeholder:block"
            placeholder="Enter Your Email Address"/>
            <div class="ml-auto">
                ${Button({ text: "Start Free Trial" })}
            </div>
        </div>
    `;
    return new nunjucks.runtime.SafeString(html);
}
