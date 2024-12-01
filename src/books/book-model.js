import { DataTypes } from "sequelize";
import { sequelize } from "../shared/utils/db_ctx.js";
import { ISBN_REGEX } from "../shared/constants/regex.js";

const MODEL_NAME = "book";

const BooksSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: ISBN_REGEX,
    },
  },
  totalCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  availableCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  shelfLocation: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false,
  },
};

const Books = sequelize.define(MODEL_NAME, BooksSchema, {
  indexes: [
    {
      fields: ["title"],
      using: "GIN", // Use GIN index
      operator: "gin_trgm_ops", // Operator for pg_trgm
    },
    {
      fields: ["author"],
      using: "GIN",
      operator: "gin_trgm_ops",
    },
    {
      fields: ["isbn"],
      using: "GIN",
      operator: "gin_trgm_ops",
    },
  ],
});

export default Books;
