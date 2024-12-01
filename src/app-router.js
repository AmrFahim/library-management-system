import { Router } from "express";
import BooksRouter from "./books/Books-router.js";
import BorrowersRouter from "./borrowers/borrowers-router.js";
import BorrowingProcesses from "./borrowing-processes/borrowing-processes-router.js";
const router = Router();

router.use("/books", BooksRouter);
router.use("/borrowers", BorrowersRouter);
router.use("/borrowing-processes", BorrowingProcesses);
router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

router.get("/health", (req, res) => {
  res.status(200).send({ status: "the server is up and running" });
});

export default router;
