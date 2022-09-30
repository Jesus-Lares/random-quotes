import request from "supertest";
import express from "express";
import UserFactory from "../factories/userFactory";
import JWT from "../../../src/utils/jwt";

const makeApiKeyWithToken = async (app: express.Application) => {
  const URL_BASE = "/api/v1/user";
  const userMock = UserFactory.createDefault();
  const createUser = await request(app)
    .post(`${URL_BASE}/login`)
    .send(userMock);
  const response = await request(app)
    .get(`${URL_BASE}/generateApiKey`)
    .set("authorization", createUser.body.token);
  const verified = new JWT().verify(createUser.body.token);
  const userId = Object.values(verified)[0].id;
  return { apiKey: response.body.apiKey, userId };
};

export default makeApiKeyWithToken;
