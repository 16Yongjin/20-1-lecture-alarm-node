import { Request, Response } from "express";
import { getLectures } from "./SearchController";
import { checkLectureParams } from "../../middleware/checks";

export default [
  {
    path: "/lectures",
    method: "get",
    handler: [
      checkLectureParams,
      async ({ query }: Request, res: Response) => {
        const lectures = await getLectures(query.courseId);
        res.send(lectures);
      }
    ]
  }
];
