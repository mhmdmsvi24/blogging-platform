import nunjucks from "nunjucks";

export function Button({ variant, text }) {
    const base = variant === "primary"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-800";

    const html = `<button class="px-4 py-2 cursor-pointer rounded ${base}">${text}</button>`;
    return new nunjucks.runtime.SafeString(html);
}
