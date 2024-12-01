import BorrowingProcess from "./borrowing-process-model.js";
import httpStatus from "http-status";
import Borrower from "../borrowers/borrower-model.js";
import Book from "../books/book-model.js";
import { sequelize } from "../shared/utils/db_ctx.js";
import { Op } from "sequelize";
import dayjs from "dayjs";

class BorrowingProcessService {
  /**
   * Validate borrower and book existence
   * @param {number} borrowerId - The ID of the borrower
   * @param {number} bookId - The ID of the book
   * @returns {Promise<{book: Book, borrower: Borrower}>} Validated book
   * @throws {Error} When borrower or book does not exist
   */
  static async validateBorrowerAndBook(borrowerId, bookId) {
    const [borrower, book] = await Promise.all([
      Borrower.findByPk(borrowerId),
      Book.findByPk(bookId),
    ]);

    if (!borrower) {
      const error = new Error("Borrower does not exist");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    if (!book) {
      const error = new Error("Book does not exist");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    return { book, borrower };
  }

  /**
   * Process a book borrowing for a borrower
   * @param {number} borrowerId - The ID of the borrower
   * @param {number} bookId - The ID of the book to borrow
   * @param {string} returnDate - The expected return date for the book
   * @returns {Promise<BorrowingProcess>} The created borrowing process record
   * @throws {Error} When borrowing is not possible due to various conditions
   */
  static async borrow(borrowerId, bookId, returnDate) {
    // Validate borrower and book
    const { book, borrower } = await this.validateBorrowerAndBook(
      borrowerId,
      bookId
    );

    // Check if book is already borrowed by this borrower
    const existingBorrowing = await BorrowingProcess.findOne({
      where: {
        borrowerId,
        bookId,
        confirmedReturnDate: null,
      },
    });

    if (existingBorrowing) {
      const error = new Error("Borrower has already borrowed this book");
      error.status = httpStatus.UNPROCESSABLE_ENTITY;
      throw error;
    }

    // Check book availability
    if (book.availableCount === 0) {
      const error = new Error("No copies of the book are available");
      error.status = httpStatus.UNPROCESSABLE_ENTITY;
      throw error;
    }

    const transaction = await sequelize.transaction();

    try {
      // Decrement book availability
      await book.decrement({ availableCount: 1 }, { transaction });

      // Create borrowing process
      const borrowingProcess = await BorrowingProcess.create(
        {
          borrowerId,
          bookId,
          returnDate,
        },
        { transaction }
      );

      await transaction.commit();
      return borrowingProcess;
    } catch (error) {
      await transaction.rollback();
      const formattedError = new Error(`Borrowing failed: ${error.message}`);
      formattedError.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw formattedError;
    }
  }

  /**
   * Process returning a borrowed book
   * @param {number} borrowerId - The ID of the borrower returning the book
   * @param {number} bookId - The ID of the book being returned
   * @returns {Promise<BorrowingProcess>} The updated borrowing process record
   * @throws {Error} When book return is not possible due to various conditions
   */
  static async returnBook(borrowerId, bookId) {
    // Validate borrower and book
    await this.validateBorrowerAndBook(borrowerId, bookId);

    // Find the specific borrowing process
    const borrowingProcess = await BorrowingProcess.findOne({
      where: {
        borrowerId,
        bookId,
        confirmedReturnDate: null,
      },
    });

    if (!borrowingProcess) {
      const error = new Error("No active borrowing found for this book");
      error.status = httpStatus.BAD_REQUEST;
      throw error;
    }

    const book = await Book.findByPk(bookId);
    const transaction = await sequelize.transaction();

    try {
      // Increment book availability
      await book.increment({ availableCount: 1 }, { transaction });

      // Update borrowing process with return date
      const updatedBorrowingProcess = await borrowingProcess.update(
        {
          confirmedReturnDate: dayjs().format("YYYY-MM-DD"),
        },
        { transaction }
      );

      await transaction.commit();
      return updatedBorrowingProcess;
    } catch (error) {
      await transaction.rollback();
      const formattedError = new Error(`Book return failed: ${error.message}`);
      formattedError.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw formattedError;
    }
  }

  /**
   * List active borrowed books for a borrower
   * @param {number} borrowerId - The ID of the borrower
   * @returns {Promise<BorrowingProcess[]>} List of active borrowing processes
   * @throws {Error} When borrower does not exist or database error occurs
   */
  static async listActiveBorrowedBooks(borrowerId) {
    // Validate borrower existence
    // await this.validateBorrowerAndBook(borrowerId, 1);
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      const error = new Error("Borrower does not exist");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    try {
      const activeBorrowings = await BorrowingProcess.findAll({
        where: {
          borrowerId,
          confirmedReturnDate: null,
        },
        include: [
          {
            model: Book,
            attributes: ["id", "title", "author", "isbn"], // Select specific book details
          },
        ],
        order: [["createdAt", "DESC"]], // Most recent borrowings first
      });

      return activeBorrowings.map((borrowing) => ({
        returnDate: borrowing.returnDate,
        bookTitle: borrowing.book.title,
      }));
    } catch (error) {
      const formattedError = new Error(
        `Failed to retrieve borrowed books: ${error.message}`
      );
      formattedError.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw formattedError;
    }
  }

  /**
   * Retrieves a list of overdue borrowing records.
   * An overdue record is defined as a borrowing process where:
   * 1. The expected return date is in the past
   * 2. The book has not been confirmed as returned
   *
   * @returns {Promise<Array>}
   * @throws {Error} When there's an issue retrieving overdue records
   */
  static async listOverdue() {
    try {
      const overdueRecords = await BorrowingProcess.findAll({
        where: {
          returnDate: {
            [Op.lt]: new Date(), // Return date is less than current date
          },
          confirmedReturnDate: null, // Not yet confirmed as returned
        },
        include: [
          {
            model: Borrower,
            attributes: ["id", "name", "email"], // Include relevant borrower details
          },
          {
            model: Book,
            attributes: ["id", "title"], // Include relevant book details
          },
        ],
        order: [["returnDate", "ASC"]], // Sort by oldest overdue first
      });

      return overdueRecords;
    } catch (error) {
      console.error("Error retrieving overdue records:", error);
      error.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw error;
    }
  }
}

export default BorrowingProcessService;
