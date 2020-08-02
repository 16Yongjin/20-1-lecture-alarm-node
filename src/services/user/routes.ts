import {
  checkAddUserAlarmBody,
  checkDeleteUserAlarmBody,
} from "./../../middleware/checks";
import {
  findUserAlarm,
  addUserAlarm,
  deleteUserAlarm,
  deprecatedAlarm,
} from "./UserController";

export default [
  {
    path: "/users/:id",
    method: "get",
    handler: findUserAlarm,
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
  {
    path: "/myalarm",
    method: "post",
    handler: deprecatedAlarm,
  },
];
