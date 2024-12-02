import BorrowersService from "./borrowers-service.js";
import BorrowingProcessService from "../borrowing-processes/borrowing-processes-service.js";
import httpStatus from "http-status";

class BorrowersController {
  static async listBorrowers(req, res) {
    try {
      const { count, borrowers } = await BorrowersService.listBorrowers(
        req.query
      );
      res.status(httpStatus.OK).json({
        message: "Success",
        count,
        borrowers,
      });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const { token, borrower } = await BorrowersService.register(req.body);
      const { password, updatedAt, ...formattedBorrowerDate } =
        borrower.toJSON();
      res.status(httpStatus.CREATED).json({
        message: "Borrower registered successfully",
        token,
        borrower: formattedBorrowerDate,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.BAD_REQUEST)
        .json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { token, borrower } = await BorrowersService.login(req.body);
      const { password, updatedAt, ...formattedBorrowerDate } =
        borrower.toJSON();
      res.status(httpStatus.CREATED).json({
        message: "Borrower logged-in successfully",
        token,
        borrower: formattedBorrowerDate,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.BAD_REQUEST)
        .json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const borrowerId = req.params.id;
      const updatedBorrower = await BorrowersService.update(
        borrowerId,
        req.body
      );
      const { password, updatedAt, ...formattedBorrowerDate } =
        updatedBorrower.toJSON();
      res.status(httpStatus.OK).json({
        message: "Borrower updated successfully",
        Borrower: formattedBorrowerDate,
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

  static async borrow(req, res) {
    try {
      const borrowerId = req.params.id;
      const bookId = req.params.bookId;

      const borrowProcess = await BorrowingProcessService.borrow(
        borrowerId,
        bookId,
        req.body.returnDate
      );
      const { returnDate } = borrowProcess.toJSON();
      res.status(httpStatus.CREATED).json({
        message: "the borrowing process is done successfully",
        borrowerId,
        bookId,
        returnDate,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  static async return(req, res) {
    try {
      const borrowerId = req.params.id;
      const bookId = req.params.bookId;

      const returnProcess = await BorrowingProcessService.returnBook(
        borrowerId,
        bookId
      );
      const { confirmedReturnDate } = returnProcess.toJSON();
      res.status(httpStatus.OK).json({
        message: "returning the book is done successfully",
        borrowerId,
        bookId,
        confirmedReturnDate,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  static async listBorrowerActiveProcesses(req, res) {
    try {
      const borrowerId = req.params.id;
      const processes = await BorrowingProcessService.listActiveBorrowedBooks(
        borrowerId
      );

      res.status(httpStatus.OK).json({
        message: "success",
        count: processes.length,
        books: processes,
      });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
}

export default BorrowersController;
