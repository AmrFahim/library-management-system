import { Router } from "express";
import BorrowersController from "./borrowers-controller.js";
import { ReqValidationTypes } from "../shared/constants/enums.js";
import { validateRequest } from "../shared/middlewares/request-validator.js";
import { stringToDate } from "../shared/middlewares/str-date-converter.js";
import {
  listBorrowersSchema,
  registerBorrowerSchema,
  updateBorrowerBodySchema,
  updateBorrowerParamsSchema,
  deleteBorrowerSchema,
} from "./borrowers-validations-schemas.js";
const router = Router();

router.get(
  "/",
  validateRequest(listBorrowersSchema, ReqValidationTypes.QUERY),
  BorrowersController.listBorrowers
);

router.post(
  "/register",
  validateRequest(registerBorrowerSchema),
  BorrowersController.register
);

router.patch(
  "/:id",
  validateRequest(updateBorrowerParamsSchema, ReqValidationTypes.PARAMS),
  validateRequest(updateBorrowerBodySchema),
  BorrowersController.update
);
router.delete(
  "/:id",
  validateRequest(deleteBorrowerSchema, ReqValidationTypes.PARAMS),
  BorrowersController.delete
);

export default router;
