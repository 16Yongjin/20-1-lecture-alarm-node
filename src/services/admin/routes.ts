import {
  findUsers,
  findAlarms,
  startCron,
  stopCron,
  findLogs,
  findErrors,
  findCompletedAlarms,
  sendLogViewer,
  sendAlarmLogViewer,
  getDashboardData,
} from "./AdminController";
import { checkAuth } from "../../middleware/checks";

export default [
  {
    path: "/admin/users",
    method: "get",
    handler: [checkAuth, findUsers],
  },
  {
    path: "/admin/alarms",
    method: "get",
    handler: [checkAuth, findAlarms],
  },
  {
    path: "/admin/startCron",
    method: "get",
    handler: [checkAuth, startCron],
  },
  {
    path: "/admin/stopCron",
    method: "get",
    handler: [checkAuth, stopCron],
  },
  {
    path: "/admin/logs",
    method: "get",
    handler: [checkAuth, findLogs],
  },
  {
    path: "/admin/errors",
    method: "get",
    handler: [checkAuth, findErrors],
  },
  {
    path: "/admin/completedAlarms",
    method: "get",
    handler: [checkAuth, findCompletedAlarms],
  },
  {
    path: "/admin/logViewer",
    method: "get",
    handler: sendLogViewer,
  },
  {
    path: "/admin/alarmLogViewer",
    method: "get",
    handler: sendAlarmLogViewer,
  },
  {
    path: "/admin/dashboardData",
    method: "get",
    handler: [checkAuth, getDashboardData],
  },
]