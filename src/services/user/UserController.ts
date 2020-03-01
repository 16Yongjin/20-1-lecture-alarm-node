import { Request, Response } from "express";
import { User, Lecture } from "../../entities";

export const findUserUser = async (
  { params }: Request,
  res: Response
): Promise<void> => {
  const user = await User.findOne({
    where: { user: params.user },
    relations: ["lectures"]
  });

  res.send(user);
};

export const addUser = async (
  { body }: Request,
  res: Response
): Promise<void> => {
  const { user, lectureId } = body;

  const lecture = await Lecture.findOneOrFail(lectureId);

  const alarm = await User.findOne(user);

  if (alarm) {
    alarm.lectures = [...alarm.lectures, lecture];
    const updatedUser = await alarm.save();
    res.send(updatedUser);
  } else {
    const newUser = await User.create({ user, lectures: [lecture] }).save();
    res.send(newUser);
  }
};
