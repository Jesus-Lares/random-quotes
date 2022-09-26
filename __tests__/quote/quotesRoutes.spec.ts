/* eslint-disable quotes */
import request from "supertest";
import app from "../../src/app";
import server from "../../src/index";
import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import { NOT_FOUND } from "../../src/utils/messages/errorResponse";
import quoteMessages from "../../src/utils/messages/quote";
import makeQuote from "../mocks/makes/makeQuote";
import CreateQuoteUseCases from "../../src/context/quote/infra/useCases/createQuote";
import { Quote } from "../../src/context/quote/domain/Quote";
import makeToken from "../mocks/makes/makeToken";
import { UserRole } from "../../src/context/user/domain/User";

let mockQuote: Quote;
let token: string;

beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await UserSchema.destroy({ truncate: true });
  await QuoteSchema.destroy({ truncate: true });
  const { quote, user } = await makeQuote();
  mockQuote = quote;
  token = await makeToken(user.id, user.name, UserRole.admin);
});
afterAll(() => {
  sequelize.close();
  server.close();
});

describe("quote routes", () => {
  const URL_BASE = "/api/v1/quote";
  const createQuote = new CreateQuoteUseCases();

  test(`@POST ${URL_BASE} it should return data if the quote was created correctly`, async () => {
    const response = await request(app)
      .post(URL_BASE)
      .set("authorization", token)
      .send(mockQuote);
    expect(response.body).toHaveProperty("quote");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(quoteMessages.CREATE_SUCCESS);
  });

  test(`@POST ${URL_BASE} it should return an error message with the required parameters`, async () => {
    const requireParams = {
      body: [
        '"quote" is required',
        '"writer" is required',
        '"role" is required',
        '"user" is required',
      ],
    };
    const response = await request(app)
      .post(URL_BASE)
      .set("authorization", token)
      .send({});
    expect(response.body).toEqual(requireParams);
  });

  test(`@GET ${URL_BASE}/all it should return an array with all quotes`, async () => {
    const mockQuotes = [mockQuote];
    await createQuote.exec(mockQuote);
    const response = await request(app)
      .get(`${URL_BASE}/all`)
      .set("authorization", token)
      .expect(200);
    expect(response.body.length).toBe(mockQuotes.length);
  });

  test(`@GET ${URL_BASE} should return null if quote does not exist`, async () => {
    await QuoteSchema.destroy({ truncate: true });
    const response = await request(app)
      .get(URL_BASE)
      .set("authorization", token);
    expect(response.body).toBeNull();
  });

  test(`@GET ${URL_BASE} should be return a record with the quote writer`, async () => {
    await createQuote.exec(mockQuote);
    const response = await request(app)
      .get(URL_BASE)
      .set("authorization", token);
    expect(response.body.writer).toBe(mockQuote.writer);
  });

  test(`@GET ${URL_BASE}/:id it should return errorMessage if the quote does not exist`, async () => {
    const response = await request(app)
      .get(`${URL_BASE}/12`)
      .set("authorization", token);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@GET ${URL_BASE}/:id It should return the quote's writer with the id that we are requesting`, async () => {
    const quote = await createQuote.exec(mockQuote);
    const response = await request(app)
      .get(`${URL_BASE}/${quote.id}`)
      .set("authorization", token);
    expect(response.body.writer).toBe(mockQuote.writer);
  });

  test(`@PUT ${URL_BASE}/:id it should return error message if quote does not exist`, async () => {
    const response = await request(app)
      .put(`${URL_BASE}/12`)
      .set("authorization", token);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@PUT ${URL_BASE}/:id It should be updated according to the parameters sent`, async () => {
    const quote = await createQuote.exec(mockQuote);
    const response = await request(app)
      .put(`${URL_BASE}/${quote.id}`)
      .set("authorization", token)
      .send({ writer: "updated" });
    expect(response.body.quote.writer).toBe("updated");
    expect(response.body.message).toBe(quoteMessages.UPDATE_SUCCESS);
  });

  test(`@DELETE ${URL_BASE}/:id it should return error message if quote does not exist`, async () => {
    const response = await request(app)
      .delete(`${URL_BASE}/12`)
      .set("authorization", token);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@DELETE ${URL_BASE}/:id It should return a message if deleted correctly`, async () => {
    const quote = await createQuote.exec(mockQuote);
    const response = await request(app)
      .delete(`${URL_BASE}/${quote.id}`)
      .set("authorization", token);
    expect(response.body.message).toBe(quoteMessages.DELETE_SUCCESS);
  });
});
