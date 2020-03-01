import { Request, Response } from "express";
import { findUserUser } from "./UserController";

export default [
  {
    path: "/users/:user",
    method: "get",
    handler: findUserUser
  }
];
