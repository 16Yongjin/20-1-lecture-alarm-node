import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkLectureParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.courseId) {
    throw new HTTP400Error("Missing courseId parameter");
  } else {
    next();
  }
};
