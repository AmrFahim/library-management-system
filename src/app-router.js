import { Router } from "express";
import BooksRouter from "./books/Books-router.js";
const router = Router();

router.use("/books", BooksRouter);
router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

router.get("/health", (req, res) => {
  res.status(200).send({ status: "the server is up and running" });
});

export default router;
