import httpStatus from "http-status";
import BooksService from "./books-service.js";

class BooksController {
  static async listBooks(req, res) {
    try {
      const { count, books } = await BooksService.listBooks(req.query);
      res.status(httpStatus.OK).json({
        message: "success",
        count,
        books,
      });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
  static async addBook(req, res) {
    try {
      const book = await BooksService.addBook(req.body);
      const { createdAt, updatedAt, ...bookWithoutMetadata } = book.toJSON();
      res
        .status(httpStatus.CREATED)
        .json({
          message: "Book is added successfully",
          book: bookWithoutMetadata,
        });
    } catch (error) {
      res
        .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
  static async updateBook(req, res) {
    try {
      const bookId = req.params.id;
      const updatedBook = await BooksService.updateBook(bookId, req.body);
      const { createdAt, updatedAt, ...bookWithoutMetadata } =
        updatedBook.toJSON();
      res
        .status(httpStatus.OK)
        .json({
          message: "Book is updated successfully",
          book: bookWithoutMetadata,
        });
    } catch (error) {
      res
        .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
  static async deleteBook(req, res) {
    try {
      const bookId = req.params.id;
      await BooksService.deleteBook(bookId);
      res
        .status(httpStatus.OK)
        .json({ message: "Book is deleted successfully" });
    } catch (error) {
      res
        .status(error.status || httpStatus.NOT_FOUND)
        .json({ error: error.message });
    }
  }
}

export default BooksController;
