import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                // Add other properties if needed, e.g., email, roles, etc.
            };
        }
    }
}