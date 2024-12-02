import { Router } from "express";
import BorrowersController from "./borrowers-controller.js";
import { ReqValidationTypes } from "../shared/constants/enums.js";
import { validateRequest } from "../shared/middlewares/request-validator.js";
import { stringToDate } from "../shared/middlewares/str-date-converter.js";
import { rateLimiter } from "../shared/middlewares/rate-limiter.js";
import { authenticateToken } from "../shared/middlewares/authenticate-token.js";
import {
  listBorrowersSchema,
  registerBorrowerSchema,
  updateBorrowerBodySchema,
  updateBorrowerParamsSchema,
  deleteBorrowerSchema,
  borrowBodySchema,
  borrowParamsSchema,
  returnBookParamsSchema,
  listBorrowerActiveProcessesSchema,
  loginBorrowerSchema,
} from "./borrowers-validations-schemas.js";
const router = Router();

router.get(
  "/",
  rateLimiter,
  validateRequest(listBorrowersSchema, ReqValidationTypes.QUERY),
  BorrowersController.listBorrowers
);

router.get(
  "/:id/active-borrows",
  authenticateToken,
  validateRequest(listBorrowerActiveProcessesSchema, ReqValidationTypes.PARAMS),
  BorrowersController.listBorrowerActiveProcesses
);

router.post(
  "/register",
  validateRequest(registerBorrowerSchema),
  BorrowersController.register
);

router.post(
  "/login",
  validateRequest(loginBorrowerSchema),
  BorrowersController.login
);

router.patch(
  "/:id",
  authenticateToken,
  validateRequest(updateBorrowerParamsSchema, ReqValidationTypes.PARAMS),
  validateRequest(updateBorrowerBodySchema),
  BorrowersController.update
);
router.delete(
  "/:id",
  authenticateToken,
  validateRequest(deleteBorrowerSchema, ReqValidationTypes.PARAMS),
  BorrowersController.delete
);

router.post(
  "/:id/books/:bookId/borrow",
  authenticateToken,
  validateRequest(borrowParamsSchema, ReqValidationTypes.PARAMS),
  validateRequest(borrowBodySchema),
  stringToDate("returnDate"),
  BorrowersController.borrow
);

router.post(
  "/:id/books/:bookId/return",
  authenticateToken,
  validateRequest(returnBookParamsSchema, ReqValidationTypes.PARAMS),
  BorrowersController.return
);

export default router;
