import { logger } from "./logger";
import { Response, NextFunction } from "express";
import { HTTPClientError, HTTP404Error } from "./httpErrors";

export const notFoundError = () => {
  throw new HTTP404Error("Method not found.");
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    console.warn(err);
    logger.error(`[HTTP Client Error] ${err.statusCode} ${err.message}`);
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
  console.error(err);
  logger.error(`[HTTP Server Error] ${err.message}`);
  if (process.env.NODE_ENV === "production") {
    res.status(500).send("Internal Server Error");
  } else {
    res.status(500).send(err.stack);
  }
};
