import { alarmJob } from "./services/admin/AdminController";
import "dotenv/config";
import "reflect-metadata";
import { logger } from "./utils/logger";
import createDatabaseConnection from "./database/connect";
import initializeApp from "./app";

process.on("uncaughtException", e => {
  logger.error(`Closeing server : ${e.message}`);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  logger.error(`Closeing server : ${e}`);
  process.exit(1);
});

const main = async () => {
  await createDatabaseConnection();

  const app = initializeApp();

  const { PORT = 3000 } = process.env;

  app.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}`)
  );

  // alarmJob.start();
};

main();
