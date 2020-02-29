import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "./routes";

describe("routes", () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
  });

  test("a valid string query", async () => {
    const response = await request(router).get("/lectures?courseId=ATMB3_H1");
    expect(response.status).toEqual(200);
  });

  test("an empty string", async () => {
    const response = await request(router).get("/lectures?courseId=");
    expect(response.status).toEqual(400);
  });
});
