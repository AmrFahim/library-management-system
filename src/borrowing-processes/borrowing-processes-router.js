import { Router } from "express";
import BorrowingProcessesController from "./borrowing-processes-controller.js";
import { listLastMonthProcessesSchema } from "./borrowing-processes-validation-schema.js";
import { ReqValidationTypes } from "../shared/constants/enums.js";
import { validateRequest } from "../shared/middlewares/request-validator.js";
const router = Router();

router.get("/overdue", BorrowingProcessesController.listOverdueBooks);
router.get(
  "/last-month-borrows",
  validateRequest(listLastMonthProcessesSchema, ReqValidationTypes.QUERY),
  BorrowingProcessesController.listLastMonthBorrows
);
export default router;
