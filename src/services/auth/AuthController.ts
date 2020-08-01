import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const sign = promisify(jwt.sign);
const issueToken = () => sign({}, process.env.JWT_SECRET || "1q2w3e4r");

export const issueAdminToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body, process.env.ADMIN_ID);
  const { id, password } = req.body;

  if (process.env.ADMIN_ID === id && process.env.ADMIN_PASSWORD === password) {
    console.log("hi");
    const token = await issueToken();
    res.send(token);
  } else {
    res.status(401).send("wrong id or password!");
  }
};
