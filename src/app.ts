import express, { Express } from "express";
import monitor from "express-status-monitor";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import { io } from "./socket";

const initializeApp = (): Express => {
  const app = express();

  if (process.env.NODE_ENV === "production")
    app.use(monitor({ websocket: io }));

  applyMiddleware(middleware, app);
  applyRoutes(routes, app, "v1");
  applyMiddleware(errorHandlers, app);

  return app;
};

export default initializeApp;
