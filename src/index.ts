import "dotenv/config";
import "reflect-metadata";
import express from "express";

import establishDatabaseConnection from "./database/connect";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import routes from "./services";
import errorHandlers from "./middleware/errorHandlers";

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const initializeExpress = (): void => {
  const app = express();

  applyMiddleware(middleware, app);
  applyRoutes(routes, app);
  applyMiddleware(errorHandlers, app);

  const { PORT = 3000 } = process.env;

  app.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}`)
  );
};

const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
