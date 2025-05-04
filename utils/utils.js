import { fileURLToPath } from "url";
import path from "path";

// Create __filename and __dirname manually
export const __filename = fileURLToPath(import.meta.url + "/../");
export const __dirname = path.dirname(__filename);
