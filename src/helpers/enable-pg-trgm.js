import { sequelize } from "../shared/utils/db_ctx.js";

export const enablePgTrgmExtension = async () => {
  try {
    await sequelize.query("CREATE EXTENSION IF NOT EXISTS pg_trgm;");
    console.log("pg_trgm extension is enabled");
  } catch (error) {
    console.error("Error enabling pg_trgm extension:", error);
  }
};
