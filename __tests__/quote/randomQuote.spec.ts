import request from "supertest";
import app from "../../src/app";
import server from "../../src/index";
import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import ApiKeySchema from "../../src/context/apiKey/domain/ApiKeySchema";
import { NOT_FOUND } from "../../src/utils/messages/errorResponse";
import CreateDailyQuoteUseCases from "../../src/context/dailyQuote/infra/useCases/createDailyQuote";
import makeQuoteWithUserId from "../mocks/makes/makeQuoteWithUserId";
import makeApiKeyWithToken from "../mocks/makes/makeApiKeyWithToken";

let userId: number;
let apiKey: string;

beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await UserSchema.destroy({ truncate: true });
  await QuoteSchema.destroy({ truncate: true });
  await ApiKeySchema.destroy({ truncate: true });
  const apikeyCreated = await makeApiKeyWithToken(app);
  apiKey = apikeyCreated.apiKey;
  userId = apikeyCreated.userId;
});
afterAll(() => {
  sequelize.close();
  server.close();
});

describe("route of random quote of the user", () => {
  const URL_BASE = "/api/v1/quote";

  test(`@GET ${URL_BASE}/:apiKey/random It should return an error if the apikey not have user`, async () => {
    const response = await request(app)
      .get(`${URL_BASE}/1234567890/random`)
      .expect(404);
    expect(response.body.message).toBe(NOT_FOUND);
  });

  test(`@GET ${URL_BASE}/:apiKey/random It should return daily quote if have one`, async () => {
    const createdDailyQuote = new CreateDailyQuoteUseCases();
    const mockDailyQuote = await makeQuoteWithUserId(userId);
    await createdDailyQuote.exec(mockDailyQuote);
    const response = await request(app)
      .get(`${URL_BASE}/${apiKey}/random`)
      .expect(200);
    expect(response.body.quote.id).toBe(mockDailyQuote.quote);
    expect(response.body.quote.user).toBe(mockDailyQuote.userId);
  });

  test(`@GET ${URL_BASE}/:apiKey/random It should return the random quote when the daily quote was expire`, async () => {
    const createdDailyQuote = new CreateDailyQuoteUseCases();
    const mockDailyQuote = await makeQuoteWithUserId(userId, true);
    await createdDailyQuote.exec(mockDailyQuote);
    const response = await request(app)
      .get(`${URL_BASE}/${apiKey}/random`)
      .expect(200);
    expect(response.body.quote.id).not.toBe(mockDailyQuote.quote);
  });
});
