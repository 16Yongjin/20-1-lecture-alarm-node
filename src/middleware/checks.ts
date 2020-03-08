import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkLectureParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.courseId) throw new HTTP400Error("Missing courseId parameter");
  else next();
};

export const checkFindUserParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.id) next(new HTTP400Error("Missing id parameter"));
  else next();
};

export const checkAddUserAlarmBody = async (
  { body: { userId, lectureId } }: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("UserId", userId);
  console.log("lectureId", lectureId);

  if (!userId || !lectureId)
    next(new HTTP400Error("Missing userId or lectureId"));
  else next();
};

export const checkDeleteUserAlarmBody = async (
  { params: { userId, lectureId } }: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!userId || !lectureId)
    next(new HTTP400Error("Missing userId or lectureId"));
  else next();
};
