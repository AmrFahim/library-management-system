import httpStatus from "http-status";
import BooksService from "./books-service.js";

class BooksController {
  static async listBooks(req, res) {
    try {
      const books = await BooksService.listBooks(req.query);
      res.status(httpStatus.OK).json(books);
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
  static async addBook(req, res) {
    try {
      const book = await BooksService.addBook(req.body);
      res.status(httpStatus.CREATED).json({ book });
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
      res.status(httpStatus.OK).json({
        message: "Book updated successfully",
        book: updatedBook,
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
      res.status(httpStatus.OK).json({ message: "Book deleted successfully" });
    } catch (error) {
      res
        .status(error.status || httpStatus.NOT_FOUND)
        .json({ error: error.message });
    }
  }
}

export default BooksController;
