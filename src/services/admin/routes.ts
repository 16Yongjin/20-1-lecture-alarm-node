import { findUsers, findAlarms, startCron, stopCron } from "./AdminController";

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
  },
  {
    path: "/admin/startCron",
    method: "get",
    handler: startCron
  },
  {
    path: "/admin/stopCron",
    method: "get",
    handler: stopCron
  }
];
