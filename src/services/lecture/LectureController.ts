import { Request, Response } from "express";
import { Lecture } from "./../../entities";
import { getLectures } from "./providers/LectureProvider";
import { chunk, flatten } from "lodash";
import { courseIds } from "./providers/data";

export const findLectures = async (
  { params: { courseId } }: Request,
  res: Response
): Promise<void> => {
  const lectures = await Lecture.find({ where: { courseId } });
  res.send(lectures);
};

export const storeLectures = async (
  req: Request,
  res: Response
): Promise<void> => {
  const count = await Lecture.count();
  if (count >= 2122) {
    res.send("already stored lectures");
    return;
  }

  for (const courses of chunk(courseIds, 10)) {
    console.log(`fething : ${courses.join(", ")}`);

    const lectures = flatten(await Promise.all(courses.map(getLectures)));

    const newLectures = lectures.map(lecture => Lecture.create(lecture));

    console.log("저장 중..");

    const saved = await Lecture.save(newLectures);

    console.log("완료..", saved.length);
  }

  res.send("Ok");
};
