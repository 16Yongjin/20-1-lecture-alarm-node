import { Request, Response } from "express";
import { findLectures, storeLectures } from "./LectureController";
import { checkLectureParams } from "../../middleware/checks";

export default [
  {
    path: "/lectures",
    method: "get",
    handler: [checkLectureParams, findLectures]
  },
  {
    path: "/storeLectures",
    method: "get",
    handler: storeLectures
  }
];
