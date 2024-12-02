import { Sequelize } from "sequelize";
import { configs } from "../utils/config.js";

console.log("#############################################");
console.log(configs.DB_URL);
console.log("#############################################");

export const sequelize = new Sequelize(configs.DB_URL);
