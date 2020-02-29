import { Request, Response } from "express";
import { Lecture } from "./../../entities";
import { getLectures } from "./providers/LectureProvider";
import { chunk, flatten } from "lodash";
import { courseIds } from "./providers/data";

export const findLectures = async (
  { query }: Request,
  res: Response
): Promise<void> => {
  const course_id = query.courseId;

  const lectures = await Lecture.find({ where: { course_id } });

  res.send(lectures);
};

export const storeLectures = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(chunk(courseIds.slice(0, 10), 10));

  for (const courses of chunk(courseIds, 10)) {
    console.log(`fething : ${courses.join(", ")}`);

    const lectures = flatten(await Promise.all(courses.map(getLectures)));

    const newLectures = lectures.map(lecture => {
      const newLecture = new Lecture();

      console.log(lecture.name);

      newLecture.id = lecture.id;
      newLecture.index = lecture.index;
      newLecture.course_id = lecture.courseId;
      newLecture.name = lecture.name;
      newLecture.time = lecture.time;
      newLecture.professor = lecture.professor;

      return newLecture;
    });

    console.log("저장 중..");

    const saved = await Lecture.save(newLectures);

    console.log("완료..", saved.length);
  }

  res.send("Ok");
};
