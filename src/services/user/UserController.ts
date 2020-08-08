import { sendFcm } from "./../../utils/fcmSender";
import { Request, Response, NextFunction } from "express";
import { User, Lecture } from "../../entities";
import { HTTP400Error } from "./../../utils/httpErrors";

export const findLectures = async (
  { params: { userId, courseId } }: Request,
  res: Response
): Promise<void> => {
  const lectures = await Lecture.find({ where: { courseId } });
  res.send(lectures);
};

export const findUserAlarm = async (
  { params: { id } }: Request,
  res: Response
): Promise<void> => {
  let user = await User.findOne({ where: { id }, relations: ["lectures"] });

  if (!user) user = await User.create({ id, lectures: [] }).save();

  res.send(user.lectures);
};

export const addUserAlarm = async (
  { body: { userId, lectureId } }: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const lecture = await Lecture.findOne(lectureId);

  if (!lecture) return next(new HTTP400Error("존재하지 않는 강의입니다."));

  let user = await User.findOne(userId, { relations: ["lectures"] });

  if (user) {
    const duplicatedLecture = user.lectures.find(({ id }) => id === lectureId);
    if (!duplicatedLecture) user.lectures.push(lecture);
    user = await user.save();
  } else {
    user = await User.create({ id: userId, lectures: [lecture] }).save();
  }

  res.send(user.lectures);
};

export const deleteUserAlarm = async (
  { params: { userId, lectureId } }: Request,
  res: Response
): Promise<void> => {
  let user = await User.findOne(userId, { relations: ["lectures"] });

  if (user) {
    user.lectures = user.lectures.filter((lecture) => lecture.id !== lectureId);
    user = await user.save();
  } else {
    user = await User.create({ id: userId, lectures: [] }).save();
  }

  res.send(user.lectures);
};

export const deprecatedAlarm = async (
  { body }: Request,
  res: Response
): Promise<void> => {
  if (body.user && body.user.id) {
    sendFcm([body.user.id], "앱을 최신버전으로 업그레이드 해주세요!!");
  }

  res.sendStatus(400);
};
