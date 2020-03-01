import {
  checkAddUserAlarmBody,
  checkDeleteUserAlarmBody
} from "./../../middleware/checks";
import { Request, Response } from "express";
import { findUserAlarm, addUserAlarm, deleteUserAlarm } from "./UserController";

export default [
  {
    path: "/users/:id",
    method: "get",
    handler: findUserAlarm
  },
  {
    path: "/users",
    method: "post",
    handler: [checkAddUserAlarmBody, addUserAlarm]
  },
  {
    path: "/users/:userId/:lectureId",
    method: "delete",
    handler: [checkDeleteUserAlarmBody, deleteUserAlarm]
  }
];
