import "dotenv/config";
import "reflect-metadata";
import { Server } from "socket.io";
import request from "supertest";
import { Router } from "express";
import { Connection } from "typeorm";

import initializeApp from "./app";
import createTestDatabaseConnection from "./database/connectTest";
import createTestData from "./database/createTestData";
import { Lecture } from "./entities";

let router: Router;
let connection: Connection;
let io: Server;

beforeAll(async () => {
  connection = await createTestDatabaseConnection();
  await createTestData();
  router = initializeApp();
});

afterAll(async () => {
  await connection.dropDatabase();
  await connection.close();
});

describe("Lecture Service", () => {
  describe("GET /v1/lectures/:courseId", () => {
    it("코스명 ATMB3_H1 강의들 가져오기", async () => {
      const response = await request(router).get("/v1/lectures/ATMB3_H1");
      expect(response.status).toEqual(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe("GET /v1/lectures/search", () => {
    it("컴퓨터가 들어가는 강의 검색하기", async () => {
      const response = await request(router).get(
        `/v1/lectures/search?query=${encodeURIComponent("컴퓨터")}`
      );
      expect(response.status).toEqual(200);
      expect(response.body).toHaveLength(1);
    });

    it("윤성진 교수님 강의 검색하기", async () => {
      const response = await request(router).get(
        `/v1/lectures/search?query=${encodeURIComponent("윤성진")}`
      );
      expect(response.status).toEqual(200);
      expect(response.body).toHaveLength(1);
    });
  });
});

describe("User Service", () => {
  describe("GET /v1/users/:id", () => {
    it("기존 유저 가져오기", async () => {
      const response = await request(router).get("/v1/users/1");
      expect(response.status).toEqual(200);
      expect(response.body).toHaveLength(2);
    });

    it("없으면 생성해서 유저 가져오기", async () => {
      const response = await request(router).get("/v1/users/newuser");
      expect(response.status).toEqual(200);
      expect(response.body).toHaveLength(0);
    });
  });

  describe("GET /v1/users/:userId/:courseId", () => {
    it("강의 목록 중에 유저가 등록한 강의면 registered 표시", async () => {
      const userId = '777';
      const response1 = await request(router).post("/v1/users").send({
        userId,
        lectureId: "V41006101",
      });


      expect(response1.body).toHaveLength(1);

      const response2 = await request(router).get(`/v1/users/${userId}/ATMB3_H1`);

      console.log(response2.body);

      expect(response2.body[0]).toHaveProperty('registered');
      expect(response2.body[0].registered).toBeTruthy();
    })
  })

  describe("GET /v1/users/:userId/search", () => {
    it("검색한 강의 중 유저가 등록한 강의 표시", async () => {
      const userId = '888';
      const response1 = await request(router).post("/v1/users").send({
        userId,
        lectureId: "V41006101",
      });

      expect(response1.body).toHaveLength(1);

      const response2 = await request(router).get(
        `/v1/users/888/search?query=${encodeURIComponent("자료")}`
      );

      expect((response2.body as Lecture[]).some(l => l.registered)).toBeTruthy()
    })
  })



  describe("POST /v1/users", () => {
    it("알람이 2개인 기존 유저에 알람 추가", async () => {
      const existingUserRes = await request(router).get("/v1/users/2");

      expect(existingUserRes.body).toHaveLength(2);
      expect(existingUserRes.status).toEqual(200);

      const response = await request(router).post("/v1/users").send({
        userId: "2",
        lectureId: "U71187101",
      });

      expect(response.body).toHaveLength(3);
    });

    it("기존에 없던 유저에 알람 추가 ", async () => {
      const response = await request(router).post("/v1/users").send({
        userId: "100",
        lectureId: "U72207302",
      });

      expect(response.status).toEqual(200);
      expect(response.body).toHaveLength(1);
    });

    it("이미 추가된 알람은 가볍게 무시", async () => {
      const response1 = await request(router).post("/v1/users").send({
        userId: "addAgain",
        lectureId: "U72207302",
      });

      expect(response1.status).toEqual(200);
      expect(response1.body).toHaveLength(1);

      const response2 = await request(router).post("/v1/users").send({
        userId: "addAgain",
        lectureId: "U72207302",
      });

      expect(response2.status).toEqual(200);
      expect(response2.body).toHaveLength(1);
    });

    it("존재하지 않는 강의 등록 시 400 에러", async () => {
      const response = await request(router).post("/v1/users").send({
        userId: "100",
        lectureId: "INVALID",
      });

      expect(response.status).toEqual(400);
    });
  });

  describe("DELETE /v1/users/:userId/:lectureId", () => {
    it("기존 유저의 알람 삭제", async () => {
      const existingUserRes = await request(router).get("/v1/users/3");
      expect(existingUserRes.status).toEqual(200);
      expect(existingUserRes.body).toHaveLength(3);

      const response = await request(router).delete("/v1/users/3/U71189101");

      expect(response.status).toEqual(200);
      expect(response.body).toHaveLength(2);
    });

    it("없는 유저는 생성 후 알람이 빈 상태로 반환", async () => {
      const response = await request(router).delete(
        "/v1/users/deleteNon-ExisintgUser/U71189101"
      );

      expect(response.status).toEqual(200);
      expect(response.body).toHaveLength(0);
    });
  });
});

describe("Auth Service", () => {
  describe("/v1/auth/admin", () => {
    it("어드민 인증 토큰 발급", async () => {
      const response = await request(router).post("/v1/auth/admin").send({
        id: process.env.ADMIN_ID,
        password: process.env.ADMIN_PASSWORD,
      });

      expect(response.status).toEqual(200);
    })
  })
})

describe("Admin Service", () => {
  describe("/v1/admin/users", () => {
    it("모든 유저 가져옴", async () => {
      const authResponse = await request(router).post("/v1/auth/admin").send({
        id: process.env.ADMIN_ID,
        password: process.env.ADMIN_PASSWORD,
      });

      const token = authResponse.text;

      const response = await request(router)
        .get("/v1/admin/users")
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });
  });

  describe("/v1/admin/alarms", () => {
    it("알람으로 등록된 모든 강의 가져옴", async () => {
      const authResponse = await request(router).post("/v1/auth/admin").send({
        id: process.env.ADMIN_ID,
        password: process.env.ADMIN_PASSWORD,
      });

      const token = authResponse.text;

      const response = await request(router)
        .get("/v1/admin/alarms")
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });
  });
});
