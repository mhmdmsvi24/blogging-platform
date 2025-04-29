import { twMerge } from "tailwind-merge";
import { fileURLToPath } from "url";
import clsx from "clsx";
import path from "path";

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

// Create __filename and __dirname manually
export const __filename = fileURLToPath(import.meta.url + "/../");
export const __dirname = path.dirname(__filename);
