import { Sequelize } from "sequelize";
import { configs } from "./config.js";

export const sequelize = new Sequelize(configs.DB_URL);
