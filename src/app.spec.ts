import { Connection } from "typeorm";
import "dotenv/config";
import "reflect-metadata";
import request from "supertest";

import initializeApp from "./app";
import createTestDatabaseConnection from "./database/connectTest";
import { Router } from "express";
import createTestData from "./database/createTestData";

describe("routes", () => {
  let router: Router;
  let connection: Connection;

  beforeAll(async () => {
    connection = await createTestDatabaseConnection();
    await createTestData();
    router = initializeApp();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  test("find lectures ATMB3_H1", async () => {
    const response = await request(router).get("/lectures/ATMB3_H1");
    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
  });

  test("find user", async () => {
    const response = await request(router).get("/users/1");
    expect(response.status).toEqual(200);
    expect(response.body.lectures).toHaveLength(2);
  });
});
