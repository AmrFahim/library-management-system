import { sequelize } from "./shared/db/db_ctx.js";
import { configs } from "./shared/utils/config.js";
import { enablePgTrgmExtension } from "./shared/db/enable-pg-trgm.js";
import app from "./server.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    try {
      await enablePgTrgmExtension(); // Ensure pg_trgm is enabled
      console.log("Database extensions initialized");
      // Continue with other initialization, e.g., syncing models
    } catch (error) {
      console.error("Initialization failed:", error);
    }
    // Sync database models if necessary
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");

    // Start the server
    const PORT = configs.PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
