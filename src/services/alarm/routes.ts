import { checkLectures } from "./AlarmController";

export default [
  {
    path: "/checkLectures",
    method: "get",
    handler: checkLectures
  }
];
