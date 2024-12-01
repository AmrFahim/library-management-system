import express from "express";
import appRouter from "./app-router.js";

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests

// Routes
app.use("/api", appRouter);

export default app;
