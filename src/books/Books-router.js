import { Router } from "express";
import BooksController from "./books-controller.js";
import { ReqValidationTypes } from "../shared/constants/enums.js";
import { validateRequest } from "../shared/middlewares/request-validator.js";
import {
  listBooksSchema,
  addBookSchema,
  updateBookBodySchema,
  updateBookParamsSchema,
  deleteBookSchema,
} from "./book-validation-schemas.js";

const router = Router();

router.get(
  "/",
  validateRequest(listBooksSchema, ReqValidationTypes.QUERY),
  BooksController.listBooks
);

router.post("/", validateRequest(addBookSchema), BooksController.addBook);

router.patch(
  "/:id",
  validateRequest(updateBookParamsSchema, ReqValidationTypes.PARAMS),
  validateRequest(updateBookBodySchema),
  BooksController.updateBook
);

router.delete(
  "/:id",
  validateRequest(deleteBookSchema, ReqValidationTypes.PARAMS),
  BooksController.deleteBook
);

export default router;
