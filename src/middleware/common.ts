import { logger } from "./../utils/logger";
import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import morgan from "morgan";

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};

export const handleLogging = (router: Router) => {
  const logStream = {
    write: (message: string) =>
      logger.info(message.substring(0, message.lastIndexOf("\n")))
  };

  router.use(
    morgan(":method :url :status :response-time ms - :res[content-length]", {
      stream: logStream
    })
  );
};
