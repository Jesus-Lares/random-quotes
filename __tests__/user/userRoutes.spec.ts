/* eslint-disable quotes */
import request from "supertest";
// import jwt from "jsonwebtoken";
import jwt from "../../src/utils/jwt";
import app from "../../src/app";
import server from "../../src/index";
import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import { NOT_FOUND } from "../../src/utils/messages/errorResponse";
import userMessages from "../../src/utils/messages/user";
import UserFactory from "../mocks/factories/userFactory";
import makeToken from "../mocks/makes/makeToken";
import CreateUserUseCases from "../../src/context/user/infra/useCases/createUser";
import { User } from "../../src/context/user/domain/User";

let token: string;
let mockUser: User;

beforeAll(() => sequelize.sync());
beforeEach(async () => {
  UserSchema.destroy({ truncate: true });
  mockUser = UserFactory.createDefault();
  token = await makeToken(1, mockUser.name);
});
afterAll(() => {
  sequelize.close();
  server.close();
});

describe("user routes", () => {
  const URL_BASE = "/api/v1/user";
  const createUser = new CreateUserUseCases();

  test(`@POST ${URL_BASE} it should return data if the user was created correctly`, async () => {
    const response = await request(app).post(URL_BASE).send(mockUser);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(userMessages.CREATE_SUCCESS);
  });

  test(`@POST ${URL_BASE} it should return an error message with the required parameters`, async () => {
    const requireParams = {
      body: [
        '"name" is required',
        '"email" is required',
        '"password" is required',
      ],
    };
    const response = await request(app).post(URL_BASE).send({});
    expect(response.body).toEqual(requireParams);
  });

  test(`@POST ${URL_BASE} it should return error with the message ${userMessages.EMAIL_EXIST}`, async () => {
    await request(app).post(URL_BASE).send(mockUser);
    const response = await request(app).post(URL_BASE).send(mockUser);
    expect(response.body.message).toEqual(userMessages.EMAIL_EXIST);
  });

  test(`@GET ${URL_BASE}/all it should return an array with all users`, async () => {
    const mockUsers = [mockUser];
    await createUser.exec(mockUser);
    const response = await request(app).get(`${URL_BASE}/all`).expect(200);
    expect(response.body.length).toBe(mockUsers.length);
  });

  test(`@GET ${URL_BASE} should return null if user does not exist`, async () => {
    await UserSchema.destroy({ truncate: true });
    const response = await request(app).get(URL_BASE);
    expect(response.body).toBeNull();
  });

  test(`@GET ${URL_BASE} should be return a record with the user name`, async () => {
    await createUser.exec(mockUser);
    const response = await request(app).get(URL_BASE);
    expect(response.body.name).toBe(mockUser.name);
  });

  test(`@GET ${URL_BASE}/:id it should return errorMessage if the user does not exist`, async () => {
    const response = await request(app).get(`${URL_BASE}/12`);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@GET ${URL_BASE}/:id It should return the user's name with the id that we are requesting`, async () => {
    const user = await createUser.exec(mockUser);
    const response = await request(app).get(`${URL_BASE}/${user.id}`);
    expect(response.body.name).toBe(mockUser.name);
  });

  test(`@PUT ${URL_BASE}/:id it should return error message if user does not exist`, async () => {
    const response = await request(app)
      .put(`${URL_BASE}/12`)
      .set("authorization", token);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@PUT ${URL_BASE}/:id It should be updated according to the parameters sent`, async () => {
    const user = await createUser.exec(mockUser);
    const response = await request(app)
      .put(`${URL_BASE}/${user.id}`)
      .set("authorization", token)
      .send({ name: "updated" });
    expect(response.body.user.name).toBe("updated");
    expect(response.body.message).toBe(userMessages.UPDATE_SUCCESS);
  });
  test(`@DELETE ${URL_BASE}/:id it should return error message if user does not exist`, async () => {
    const response = await request(app)
      .delete(`${URL_BASE}/12`)
      .set("authorization", token);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@DELETE ${URL_BASE}/:id It should return a message if deleted correctly`, async () => {
    const user = await createUser.exec(mockUser);
    const response = await request(app)
      .delete(`${URL_BASE}/${user.id}`)
      .set("authorization", token);
    expect(response.body.message).toBe(userMessages.DELETE_SUCCESS);
  });
});
