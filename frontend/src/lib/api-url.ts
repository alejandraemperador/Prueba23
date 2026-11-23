import "server-only";

export const apiUrl = (process.env.PRINT_API_URL ?? "http://127.0.0.1:3040/api").replace(/\/+$/, "");
