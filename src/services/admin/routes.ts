import { findUsers, findAlarms } from "./AdminController";

export default [
  {
    path: "/admin/users",
    method: "get",
    handler: findUsers
  },
  {
    path: "/admin/alarms",
    method: "get",
    handler: findAlarms
  }
];
