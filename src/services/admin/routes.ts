import {
  findUsers,
  findAlarms,
  startCron,
  stopCron,
  findLogs,
  findErrors,
  findFinishedAlarms,
  sendLogViewer,
  sendAlarmLogViewer,
  getCronStatus
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
    path: "/admin/cronStatus",
    method: "get",
    handler: getCronStatus
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
  },
  {
    path: "/admin/logViewer",
    method: "get",
    handler: sendLogViewer
  },
  {
    path: "/admin/alarmLogViewer",
    method: "get",
    handler: sendAlarmLogViewer
  }
];
