import { Router } from "express";
import BorrowingProcessesController from "./borrowing-processes-controller.js";

const router = Router();

router.get("/overdue", BorrowingProcessesController.listOverdueBooks);

export default router;
