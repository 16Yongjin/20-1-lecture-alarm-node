import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkLectureParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.courseId) next(new HTTP400Error("Missing courseId parameter"));
  else next();
};

export const checkLectureSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.name)
    next(new HTTP400Error("검색할 강의 이름을 입력해주세요."));
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

export const checkAdminAuthBody = async (
  { body: { id, password } }: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!id || !password) next(new HTTP400Error("Missing id or password"));
  else next();
};
