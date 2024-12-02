import httpStatus from "http-status";
import Book from "./book-model.js";
import { Op } from "sequelize";

class BooksService {
  /**
   * Retrieves a paginated list of books with optional sorting and search functionality.
   *
   * @param {Object} params - Parameters for retrieving books.
   * @param {Number} params.limit - The maximum number of books to return (default: 10).
   * @param {Number} params.offset - The number of books to skip (default: 0).
   * @param {String} params.sortBy - The field to sort by (default: "title").
   * @param {String} params.sortOrder - The sort order: "ASC" for ascending or "DESC" for descending (default: "ASC").
   * @param {String|null} params.searchTerm - Optional term to search books by title, author, or ISBN.
   *
   * @returns {Promise<Array>} - Returns a list of book records matching the criteria.
   *
   * @throws {Error} - Throws an error with status `500 INTERNAL_SERVER_ERROR` if retrieving books fails.
   */
  static async listBooks({
    limit = 10,
    offset = 0,
    sortBy = "title",
    sortOrder = "ASC",
    searchTerm = null,
  }) {
    try {
      const queryOptions = {
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sortBy, sortOrder]],
      };

      // If a searchTerm is provided, add a WHERE clause to enable search functionality
      if (searchTerm) {
        queryOptions.where = {
          [Op.or]: [
            { title: { [Op.iLike]: `%${searchTerm}%` } },
            { author: { [Op.iLike]: `%${searchTerm}%` } },
            { isbn: { [Op.iLike]: `%${searchTerm}%` } },
          ],
        };
      }

      const { count, rows: books } = await Book.findAndCountAll({
        ...queryOptions,
        attributes: ["title", "author", "isbn"],
        raw: true,
      });
      return { count, books };
    } catch (error) {
      const formattedError = new Error(
        "Error while fetching books: " + error.message
      );
      formattedError.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw formattedError;
    }
  }

  /**
   * Adds a new book to the library database.
   *
   * @param {Object} params - Parameters for creating a book record.
   * @param {String} params.title - The title of the book.
   * @param {String} params.author - The author's name of the book.
   * @param {String} params.isbn - The ISBN number of the book.
   * @param {Number} params.totalCount - The total number of copies available for this book.
   * @param {String} params.shelfLocation - The physical location of the book in the library.
   *
   * @returns {Promise<Object>} - Returns the newly created book record.
   *
   * @throws {Error} - Throws an error with status `422 UNPROCESSABLE_ENTITY` if the book creation fails.
   */
  static async addBook({ title, author, isbn, totalCount, shelfLocation }) {
    console.log(title, author, isbn, totalCount, shelfLocation);
    try {
      const book = await Book.create({
        title,
        author,
        isbn,
        totalCount,
        availableCount: totalCount,
        shelfLocation,
      });
      return book;
    } catch (err) {
      const error = new Error(
        "Error while adding the book " +
          err.message +
          "you may enter an existing/invalid isbn"
      );
      error.status = httpStatus.UNPROCESSABLE_ENTITY;
      throw error;
    }
  }

  /**
   * Updates the details of a book.
   * @param {number} bookId - The ID of the book to update.
   * @param {Object} updates - An object containing the fields to update.
   *
   * @returns {Promise<Object>} The updated book object.
   *
   * @throws {Error} Will throw an error if the book with the specified ID is not found.
   * The error will have a status property set to 404 (NOT_FOUND).
   **/
  static async updateBook(bookId, updates) {
    const book = await Book.findByPk(bookId);
    if (!book) {
      const error = new Error("Book not found");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }
    await book.update(updates);
    return book;
  }

  /**
   * Delete a book.
   * @param {number} bookId - The ID of the book to update.
   *
   * @returns {Promise<boolean>} .
   *
   * @throws {Error} Will throw an error if the book with the specified ID is not found.
   * The error will have a status property set to 404 (NOT_FOUND).
   **/
  static async deleteBook(BookId) {
    const book = await Book.findByPk(BookId);
    if (!book) {
      const error = new Error("Book not found");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }
    await book.destroy();
    return true;
  }

  static async findById(BookId) {
    const book = await Book.findByPk(BookId);
    if (!book) {
      const error = new Error("Book not found");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }
    return book;
  }
}

export default BooksService;
