import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import categories from "./categories"
import transactions from "./transactions"
import summary from "./summary"

export const runtime = "edge";

const app = new Hono().basePath("/api"); // Set the base path for all routes

// Define a route for handling GET requests to /api/accounts
const routes = app
.route("/summary", summary)
.route("/accounts", accounts)
.route("/categories", categories)
.route("/transactions", transactions)

// Export the handlers for Vercel deployment
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
