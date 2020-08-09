import { Request, Response } from "express";
import { chunk, flatten, chain } from "lodash";
import { Raw } from "typeorm";
import { courses } from "./providers/courses";
import { Lecture } from "./../../entities";
import { getLectures } from "./providers/LectureProvider";

export const findLectures = async (
  { params: { courseId } }: Request,
  res: Response
): Promise<void> => {
  const lectures = await Lecture.find({ where: { courseId } });
  res.send(lectures);
};

export const searchLectures = async (
  { query: { query } }: Request,
  res: Response
): Promise<void> => {
  const lectures = await Lecture.find({
    where: [
      { name: Raw((alias) => `${alias} ILIKE '%${query}%'`) },
      { professor: Raw((alias) => `${alias} ILIKE '%${query}%'`) },
    ],
    take: 30,
  });
  res.send(lectures);
};

export const storeLectures = async (
  req: Request,
  res: Response
): Promise<void> => {
  const existing = await Lecture.count();
  if (existing >= 3773) {
    res.send("already stored lectures");
    return;
  }

  const courseIds = chain(courses).values().flatten().map(1).value();

  const skip = req.query.skip || 0;

  for (const courses of chunk(courseIds.slice(skip), 10)) {
    console.log(`fething : ${courses.join(", ")}`);

    const lectures = flatten(await Promise.all(courses.map(getLectures)));

    const newLectures = lectures.map((lecture) => Lecture.create(lecture));

    console.log("저장 중..");

    const saved = await Lecture.save(newLectures);

    console.log("완료..", saved.length);
  }

  const count = await Lecture.count();

  res.send(`Stored ${count} lectures`);
};
