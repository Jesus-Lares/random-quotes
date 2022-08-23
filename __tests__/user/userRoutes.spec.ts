import request from "supertest";
import app from "../../src/app";
import server from "../../src/index";
import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import { NOT_FOUND } from "../../src/utils/errorsMessage";
import UserFactory from "../mocks/factories/userFactory";

beforeAll(() => sequelize.sync());
beforeEach(() => UserSchema.destroy({ truncate: true }));
afterAll(() => {
  sequelize.close();
  server.close();
});

describe("field routes", () => {
  const URL_BASE = "/api/v1/user";
  const mockUser = UserFactory.createDefault();

  test(`@POST ${URL_BASE} it should return data if the user was created correctly`, async () => {
    const response = await request(app).post(URL_BASE).send(mockUser);
    expect(response.body.name).toEqual(mockUser.name);
  });

  test(`@POST ${URL_BASE} it should return an error message with the required parameters`, async () => {
    const requireParams = {
      // eslint-disable-next-line quotes
      body: ['"name" is required', '"email" is required', '"age" is required'],
    };
    const response = await request(app).post(URL_BASE).send({});
    expect(response.body).toEqual(requireParams);
  });

  test(`@GET ${URL_BASE}/all it should return an array with all users`, async () => {
    const mockUsers = [mockUser];
    await request(app).post(URL_BASE).send(mockUser);
    const response = await request(app).get(`${URL_BASE}/all`).expect(200);
    expect(response.body.length).toBe(mockUsers.length);
  });

  test(`@GET ${URL_BASE} should return null if user does not exist`, async () => {
    await UserSchema.destroy({ truncate: true });
    const response = await request(app).get(URL_BASE);
    expect(response.body).toBeNull();
  });

  test(`@GET ${URL_BASE} should be return a record with the user name`, async () => {
    await request(app).post(URL_BASE).send(mockUser);
    const response = await request(app).get(URL_BASE);
    expect(response.body.name).toBe(mockUser.name);
  });

  test(`@GET ${URL_BASE}/:id it should return errorMessage if the user does not exist`, async () => {
    const response = await request(app).get(`${URL_BASE}/12`);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@GET ${URL_BASE}/:id It should return the user's name with the id that we are requesting`, async () => {
    const user = await request(app).post(URL_BASE).send(mockUser);
    const response = await request(app).get(`${URL_BASE}/${user.body.id}`);
    expect(response.body.name).toBe(mockUser.name);
  });

  test(`@PUT ${URL_BASE}/:id it should return error message if user does not exist`, async () => {
    const response = await request(app)
      .put(`${URL_BASE}/12`)
      .set("auth-token", "mytoken");
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@PUT ${URL_BASE}/:id It should be updated according to the parameters sent`, async () => {
    const user = await request(app).post(URL_BASE).send(mockUser);
    const response = await request(app)
      .put(`${URL_BASE}/${user.body.id}`)
      .set("auth-token", "mytoken")
      .send({ name: "updated" });
    expect(response.body.name).toBe("updated");
  });
  test(`@DELETE ${URL_BASE}/:id it should return error message if user does not exist`, async () => {
    const response = await request(app)
      .delete(`${URL_BASE}/12`)
      .set("auth-token", "mytoken");
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@DELETE ${URL_BASE}/:id It should return a message if deleted correctly`, async () => {
    const user = await request(app).post(URL_BASE).send(mockUser);
    const response = await request(app)
      .delete(`${URL_BASE}/${user.body.id}`)
      .set("auth-token", "mytoken");
    expect(response.body.message).toBe("User deleted");
  });
});
