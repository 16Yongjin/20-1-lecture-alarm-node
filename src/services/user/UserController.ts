import { Request, Response, NextFunction } from "express";
import { User, Lecture } from "../../entities";
import { HTTP400Error } from "./../../utils/httpErrors";
import { omit } from "lodash";

export const findLectures = async (
  { params: { userId, courseId } }: Request,
  res: Response
): Promise<void> => {
  const lectures = await Lecture.createQueryBuilder("lecture")
    .where("lecture.courseId = :courseId", { courseId })
    .leftJoinAndSelect("lecture.users", "users", "users.id = :userId", {
      userId,
    })
    .orderBy("lecture.index")
    .getMany();

  res.send(
    lectures.map((lecture) => ({
      ...omit(lecture, "users"),
      registered: !!lecture.users.length,
    }))
  );
};

export const searchLectures = async (
  { params: { userId }, query: { query } }: Request,
  res: Response
): Promise<void> => {
  const lectures = await Lecture.createQueryBuilder("lecture")
    .where("lecture.name ILIKE :query", { query: `%${query}%` })
    .orWhere("lecture.professor ILIKE :query", { query: `%${query}%` })
    .leftJoinAndSelect("lecture.users", "users", "users.id = :userId", {
      userId,
    })
    .take(30)
    .getMany();

  res.send(
    lectures.map((lecture) => ({
      ...omit(lecture, "users"),
      registered: !!lecture.users.length,
    }))
  );
};

export const findUserAlarm = async (
  { params: { id } }: Request,
  res: Response
): Promise<void> => {
  let user = await User.findOne({ where: { id }, relations: ["lectures"] });

  if (!user) user = await User.create({ id, lectures: [] }).save();

  const lectures = user.lectures.map((lecture) => ({
    ...lecture,
    registered: true,
  }));

  res.send(lectures);
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
    if (user.lectures.length >= 20) {
      res.status(413).send("최대 등록 알람 개수(20개)를 초과했습니다.");
      return;
    }

    const duplicatedLecture = user.lectures.find(({ id }) => id === lectureId);
    if (!duplicatedLecture) user.lectures.push(lecture);
    user = await user.save();
  } else {
    user = await User.create({ id: userId, lectures: [lecture] }).save();
  }

  const lectures = user.lectures.map((lecture) => ({
    ...lecture,
    registered: true,
  }));

  res.send(lectures);
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

  const lectures = user.lectures.map((lecture) => ({
    ...lecture,
    registered: true,
  }));

  res.send(lectures);
};
