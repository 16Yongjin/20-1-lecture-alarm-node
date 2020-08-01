import { flatten } from "lodash";
import jwt from "express-jwt";
import { Route, Handler } from "./../../utils/index";
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

export default [
  {
    path: "/admin/users",
    method: "get",
    handler: findUsers,
  },
  {
    path: "/admin/alarms",
    method: "get",
    handler: findAlarms,
  },
  {
    path: "/admin/startCron",
    method: "get",
    handler: startCron,
  },
  {
    path: "/admin/stopCron",
    method: "get",
    handler: stopCron,
  },
  {
    path: "/admin/logs",
    method: "get",
    handler: findLogs,
  },
  {
    path: "/admin/errors",
    method: "get",
    handler: findErrors,
  },
  {
    path: "/admin/completedAlarms",
    method: "get",
    handler: findCompletedAlarms,
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
    handler: getDashboardData,
  },
].map(({ path, method, handler }: Route) => {
  return {
    path,
    method,
    handler: flatten([
      jwt({
        secret: process.env.JWT_SECRET || "1q2w3e4r",
        algorithms: ["HS256"],
      }) as Handler,
      handler,
    ]),
  };
});
