import { sendFcm } from "./../../utils/fcmSender";
import { Request, Response } from "express";
import { filterLectures } from "./../lecture/providers/LectureProvider";
import { Lecture } from "../../entities";
import { chain, map } from "lodash";

export const checkLectures = async (): Promise<void> => {
  const lectures = await Lecture.find({
    relations: ["users", "users.lectures"],
    join: { alias: "lectures", innerJoin: { users: "lectures.users" } }
  });

  const grouped = chain(lectures)
    .groupBy("courseId")
    .entries()
    .value();

  grouped.forEach(async ([courseId, lectures]) => {
    const filteredLectures = await filterLectures(courseId, lectures);

    filteredLectures.forEach(({ id, users, name, professor, time }) => {
      sendFcm(map(users, "id"), `${name} ${professor} ${time} 자리났어요.`)
        .then(console.log)
        .then(() => users.forEach(user => user.removeLecture(id)))
        .catch(console.log);
    });
  });
};

export const checkLecturesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.send("ok");

  checkLectures();
};
