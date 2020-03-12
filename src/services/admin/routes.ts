import {
  findUsers,
  findAlarms,
  startCron,
  stopCron,
  findLogs,
  findErrors,
  findFinishedAlarms
} from "./AdminController";

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
  },
  {
    path: "/admin/logs",
    method: "get",
    handler: findLogs
  },
  {
    path: "/admin/errors",
    method: "get",
    handler: findErrors
  },
  {
    path: "/admin/finishedAlarms",
    method: "get",
    handler: findFinishedAlarms
  }
];
