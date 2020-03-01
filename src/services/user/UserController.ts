import { Request, Response } from "express";
import { User, Lecture } from "../../entities";

export const findUserAlarm = async (
  { params: { id } }: Request,
  res: Response
): Promise<void> => {
  let user = await User.findOne({ where: { id }, relations: ["lectures"] });

  if (!user) {
    user = await User.create({ id, lectures: [] }).save();
    console.log("user created", user);
  }

  res.send(user.lectures);
};

export const addUserAlarm = async (
  { body: { userId, lectureId } }: Request,
  res: Response
): Promise<void> => {
  const lecture = await Lecture.findOneOrFail(lectureId);

  let user = await User.findOne(userId, { relations: ["lectures"] });

  if (user) {
    const duplicatedLecture = user.lectures.find(
      lecture => lecture.id === lectureId
    );
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
    user.lectures = user.lectures.filter(lecture => lecture.id !== lectureId);
    user = await user.save();
  } else {
    user = await User.create({ id: userId, lectures: [] }).save();
  }

  res.send(user.lectures);
};
