import BorrowingProcessService from "./borrowing-processes-service.js";
import httpStatus from "http-status";

class BorrowingProcessesController {
  static async listOverdueBooks(req, res) {
    try {
      const overdueBooks = await BorrowingProcessService.listOverdue();

      res.status(httpStatus.OK).json({
        message: "success",
        count: overdueBooks.length,
        data: overdueBooks,
      });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
}

export default BorrowingProcessesController;
