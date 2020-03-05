import { Request, Response } from "express";
import { CronJob } from "cron";
import { User, Lecture } from "../../entities";
import { checkLectures } from "../alarm/AlarmController";

// '*/3 * 10-16 * * *'
const alarmJob = new CronJob({
  cronTime: "*/3 * 10-16 * * *",
  onTick: () => {
    console.log("alarm start");
    checkLectures();
  },
  timeZone: "Asia/Seoul"
});

alarmJob.start();

export const startCron = async (req: Request, res: Response): Promise<void> => {
  alarmJob.start();
  res.send("cron on");
};

export const stopCron = async (req: Request, res: Response): Promise<void> => {
  alarmJob.stop();
  res.send("cron off");
};

export const findUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find({ relations: ["lectures"] });
  res.send(users);
};

export const findAlarms = async (
  req: Request,
  res: Response
): Promise<void> => {
  const lectures = await Lecture.find({
    relations: ["users"],
    join: { alias: "lectures", innerJoin: { users: "lectures.users" } }
  });

  res.send(lectures);
};
