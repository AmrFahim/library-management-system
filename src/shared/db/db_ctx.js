import { Sequelize } from "sequelize";
import { configs } from "../utils/config.js";

export const sequelize = new Sequelize(configs.DB_URL);
