import BorrowersService from "./borrowers-service.js";
import httpStatus from "http-status";

class BorrowersController {
  static async register(req, res) {
    try {
      const Borrower = await BorrowersService.register(req.body);
      res.status(httpStatus.CREATED).json({
        message: "Borrower registered successfully",
        Borrower,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.BAD_REQUEST)
        .json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const BorrowerId = req.params.id;
      const updatedBorrower = await BorrowersService.update(
        BorrowerId,
        req.body
      );
      res.status(httpStatus.OK).json({
        message: "Borrower updated successfully",
        Borrower: updatedBorrower,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.NOT_FOUND)
        .json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const BorrowerId = req.params.id;
      await BorrowersService.delete(BorrowerId);
      res
        .status(httpStatus.OK)
        .json({ message: "Borrower deleted successfully" });
    } catch (error) {
      res
        .status(error.status || httpStatus.NOT_FOUND)
        .json({ error: error.message });
    }
  }
  static async listBorrowers(req, res) {
    try {
      const books = await BorrowersService.listBorrowers(req.query);
      res.status(httpStatus.OK).json(books);
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
}

export default BorrowersController;
