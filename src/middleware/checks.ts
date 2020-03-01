import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkLectureParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.course_id) {
    throw new HTTP400Error("Missing course_id parameter");
  } else {
    next();
  }
};

export const checkFindUserParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.id) {
    throw new HTTP400Error("Missing id parameter");
  } else {
    next();
  }
};
