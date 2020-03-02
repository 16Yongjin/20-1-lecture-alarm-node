import { Request, Response } from "express";
import { getLectures } from "./../lecture/providers/LectureProvider";
import { User, Lecture } from "../../entities";
import { map, flatten, uniqBy, chain, pick } from "lodash";

export const checkLectures = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.send("ok");

  let users = await User.find({ relations: ["lectures"] });

  chain(users)
    .map("lectures")
    .flatten()
    .uniqBy(({ id }) => id)
    .groupBy(({ courseId }) => courseId)
    .entries()
    .forEach(async ([courseId, lectures]) => {
      const fetchedLectures = await getLectures(courseId);

      lectures
        .filter(lecture => fetchedLectures[lecture.index].isEmpty)
        .forEach(async ({ id, name, professor, time }) => {
          const users = await Lecture.findOne(id, {
            relations: ["users"]
          }).then(l => l?.users || []);

          users.forEach(user => {
            console.log({
              to: user.id,
              message: `${name} ${professor} ${time} 자리났어요.`
            });
          });
        });
    })
    .value();
};
