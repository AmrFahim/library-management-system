import { config } from "dotenv";
config();
export const configs = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.POSTGRES_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  RATE_LIMITING_WINDOW: process.env.RATE_LIMITING_WINDOW,
  RATE_LIMITING_REQUESTS_COUNT: process.env.RATE_LIMITING_REQUESTS_COUNT,
};
