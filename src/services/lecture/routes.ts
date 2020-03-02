import { findLectures, storeLectures } from "./LectureController";

export default [
  {
    path: "/lectures/:courseId",
    method: "get",
    handler: findLectures
  },
  {
    path: "/storeLectures",
    method: "get",
    handler: storeLectures
  }
];
