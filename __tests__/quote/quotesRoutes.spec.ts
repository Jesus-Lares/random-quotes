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

let mockQuote: Quote;

beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await UserSchema.destroy({ truncate: true });
  await QuoteSchema.destroy({ truncate: true });
  mockQuote = await makeQuote();
});
afterAll(() => {
  sequelize.close();
  server.close();
});

describe("user routes", () => {
  const URL_BASE = "/api/v1/quote";
  const createQuote = new CreateQuoteUseCases();

  test(`@POST ${URL_BASE} it should return data if the quote was created correctly`, async () => {
    const response = await request(app).post(URL_BASE).send(mockQuote);
    expect(response.body).toHaveProperty("quote");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(quoteMessages.CREATE_SUCCESS);
  });

  test.skip(`@POST ${URL_BASE} it should return an error message with the required parameters`, async () => {});

  test(`@GET ${URL_BASE}/all it should return an array with all quotes`, async () => {
    const mockQuotes = [mockQuote];
    await createQuote.exec(mockQuote);
    const response = await request(app).get(`${URL_BASE}/all`).expect(200);
    expect(response.body.length).toBe(mockQuotes.length);
  });

  test(`@GET ${URL_BASE} should return null if quote does not exist`, async () => {
    await QuoteSchema.destroy({ truncate: true });
    const response = await request(app).get(URL_BASE);
    expect(response.body).toBeNull();
  });

  test(`@GET ${URL_BASE} should be return a record with the quote writer`, async () => {
    await createQuote.exec(mockQuote);
    const response = await request(app).get(URL_BASE);
    expect(response.body.writer).toBe(mockQuote.writer);
  });

  test.skip(`@GET ${URL_BASE}/:id it should return errorMessage if the quote does not exist`, async () => {
    const response = await request(app).get(`${URL_BASE}/12`);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@GET ${URL_BASE}/:id It should return the quote's writer with the id that we are requesting`, async () => {
    const quote = await createQuote.exec(mockQuote);
    const response = await request(app).get(`${URL_BASE}/${quote.id}`);
    expect(response.body.writer).toBe(mockQuote.writer);
  });

  test.skip(`@PUT ${URL_BASE}/:id it should return error message if quote does not exist`, async () => {
    const response = await request(app).put(`${URL_BASE}/12`);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@PUT ${URL_BASE}/:id It should be updated according to the parameters sent`, async () => {
    const quote = await createQuote.exec(mockQuote);
    const response = await request(app)
      .put(`${URL_BASE}/${quote.id}`)
      .send({ writer: "updated" });
    expect(response.body.quote.writer).toBe("updated");
    expect(response.body.message).toBe(quoteMessages.UPDATE_SUCCESS);
  });
  test.skip(`@DELETE ${URL_BASE}/:id it should return error message if quote does not exist`, async () => {
    const response = await request(app).delete(`${URL_BASE}/12`);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@DELETE ${URL_BASE}/:id It should return a message if deleted correctly`, async () => {
    const quote = await createQuote.exec(mockQuote);
    const response = await request(app).delete(`${URL_BASE}/${quote.id}`);
    expect(response.body.message).toBe(quoteMessages.DELETE_SUCCESS);
  });
});
