import { DataTypes } from "sequelize";
import { sequelize } from "../shared/utils/db_ctx.js";
import Book from "../books/book-model.js";
import Borrower from "../borrowers/borrower-model.js";

const MODEL_NAME = "borrowing_process";
const borrowingProcessSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  borrowerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Borrower, // Reference to the Borrower model
      key: "id", // The key in the User model to reference
    },
    onDelete: "CASCADE", // Optional: Cascade delete BorrowingProcess when User is deleted
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book, // Reference to the Book model
      key: "id", // The key in the Book model to reference
    },
    onDelete: "CASCADE", // Optional: Cascade delete BorrowingProcess when Book is deleted
  },
  returnDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  confirmedReturnDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
  },
};

const BorrowingProcess = sequelize.define(MODEL_NAME, borrowingProcessSchema);

BorrowingProcess.belongsTo(Borrower, { foreignKey: "borrowerId" });
BorrowingProcess.belongsTo(Book, { foreignKey: "bookId" });
export default BorrowingProcess;
