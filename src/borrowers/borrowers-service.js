import bcrypt from "bcrypt";
import httpStatus from "http-status";
import Borrower from "./borrower-model.js";

class BorrowersService {
  /**
   * Register a new borrower
   * @param {Object} borrowerData - Borrower registration details
   * @param {string} borrowerData.name - Borrower's full name
   * @param {string} borrowerData.email - Borrower's email address
   * @param {string} borrowerData.password - Borrower's password
   * @returns {Promise<Borrower>} Newly created borrower
   * @throws {Error} If borrower already exists
   */
  static async register({ name, email, password }) {
    // Check for existing borrower
    const existingBorrower = await Borrower.findOne({ where: { email } });
    if (existingBorrower) {
      const error = new Error("Borrower already exists");
      error.status = httpStatus.CONFLICT;
      throw error;
    }

    // Hash password and create borrower
    const hashedPassword = await bcrypt.hash(password, 10);
    return Borrower.create({ name, email, password: hashedPassword });
  }

  /**
   * Update borrower details
   * @param {number} borrowerId - ID of the borrower to update
   * @param {Object} updates - Fields to update
   * @returns {Promise<Borrower>} Updated borrower
   * @throws {Error} If borrower not found
   */
  static async update(borrowerId, updates) {
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      const error = new Error("Borrower not found");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    return borrower.update(updates);
  }

  /**
   * Delete a borrower
   * @param {number} borrowerId - ID of the borrower to delete
   * @returns {Promise<boolean>} Deletion success
   * @throws {Error} If borrower not found
   */
  static async delete(borrowerId) {
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      const error = new Error("Borrower not found");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    await borrower.destroy();
    return true;
  }

  /**
   * List borrowers with pagination and sorting
   * @param {Object} options - Query options
   * @param {number} [options.limit=10] - Number of records to return
   * @param {number} [options.offset=0] - Number of records to skip
   * @param {string} [options.sortBy='createdAt'] - Field to sort by
   * @param {string} [options.sortOrder='ASC'] - Sort direction
   * @returns {Promise<Borrower[]>} List of borrowers
   */
  static async listBorrowers({
    limit = 10,
    offset = 0,
    sortBy = "registerAt",
    sortOrder = "ASC",
  }) {
    try {
      return await Borrower.findAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sortBy, sortOrder]],
      });
    } catch (error) {
      const formattedError = new Error(
        `Error while fetching borrowers: ${error.message}`
      );
      formattedError.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw formattedError;
    }
  }
}

export default BorrowersService;
