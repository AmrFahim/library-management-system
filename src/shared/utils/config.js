import { config } from "dotenv";
config();
export const configs = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.POSTGRES_URI,
};
