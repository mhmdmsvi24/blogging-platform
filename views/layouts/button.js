import nunjucks from "nunjucks";
import { cn } from "../../utils/utils.js";
import { cva } from "class-variance-authority";

const buttonStyles = cva(
    ["flex", "items-center", "justify-center", "transition-colors", "rounded-full", "cursor-pointer", "font-bold", "text-nowrap"],
    {
        variants: {
            variant: {
                default: ["bg-black", "text-white"],
                light: ["bg-white",]
            },
            size: {
                button: ["h-10", "py-6", "px-6"],
                icon: ["h-20", "p-2.5"],
                full: ["w-full"]
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export function Button({ variant = "default", size = "button", className = "", text }) {
    const html = `<button class="${cn(buttonStyles({ variant, size }), className)}">${text}</button>`;
    return new nunjucks.runtime.SafeString(html);
}
