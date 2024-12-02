import { DataTypes } from "sequelize";
import { sequelize } from "../shared/db/db_ctx.js";
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../shared/constants/regex.js";

const MODEL_NAME = "Borrower";

const BorrowerSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 30],
      is: NAME_REGEX,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: EMAIL_REGEX,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
const Borrower = sequelize.define(MODEL_NAME, BorrowerSchema, {
  createdAt: "registerAt",
});

export default Borrower;
