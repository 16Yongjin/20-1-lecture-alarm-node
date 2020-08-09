import {
  checkAddUserAlarmBody,
  checkDeleteUserAlarmBody,
  checkLectureSearchParams,
} from "./../../middleware/checks";
import {
  findUserAlarm,
  findLectures,
  addUserAlarm,
  deleteUserAlarm,
  searchLectures,
} from "./UserController";

export default [
  {
    path: "/users/:id",
    method: "get",
    handler: findUserAlarm,
  },
  {
    path: "/users/:userId/search",
    method: "get",
    handler: [checkLectureSearchParams, searchLectures],
  },
  {
    path: "/users/:userId/:courseId",
    method: "get",
    handler: findLectures,
  },
  {
    path: "/users",
    method: "post",
    handler: [checkAddUserAlarmBody, addUserAlarm],
  },
  {
    path: "/users/:userId/:lectureId",
    method: "delete",
    handler: [checkDeleteUserAlarmBody, deleteUserAlarm],
  },
];
