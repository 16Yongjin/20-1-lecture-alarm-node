import { Request, Response } from "express";
import { User, Lecture } from "../../entities";

export const findUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find({ relations: ["lectures"] });
  res.send(users);
};

export const findAlarms = async (
  req: Request,
  res: Response
): Promise<void> => {
  const lectures = await Lecture.find({
    relations: ["users"],
    join: { alias: "lectures", innerJoin: { users: "lectures.users" } }
  });

  res.send(lectures);
};
