/* eslint-disable quotes */
import request from "supertest";
import app from "../../src/app";
import server from "../../src/index";
import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import ApiKeySchema from "../../src/context/apiKey/domain/ApiKeySchema";
import { NOT_FOUND } from "../../src/utils/messages/errorResponse";
import quoteMessages from "../../src/utils/messages/quote";
import makeQuote from "../mocks/makes/makeQuote";
import CreateQuoteUseCases from "../../src/context/quote/infra/useCases/createQuote";
import { Quote } from "../../src/context/quote/domain/Quote";
import makeToken from "../mocks/makes/makeToken";
import { UserRole } from "../../src/context/user/domain/User";
import makeApiKey from "../mocks/makes/makeApiKey";
import CreateApiKeyUseCases from "../../src/context/apiKey/infra/useCases/createApiKey";

let mockQuote: Quote;
let token: string;
let apiKey: string;

beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await UserSchema.destroy({ truncate: true });
  await QuoteSchema.destroy({ truncate: true });
  await ApiKeySchema.destroy({ truncate: true });
  const makeApi = await makeApiKey();
  const createApiKey = new CreateApiKeyUseCases();
  const { apiKey: apikeyCreated } = await createApiKey.exec(makeApi);
  apiKey = apikeyCreated;
});
afterAll(() => {
  sequelize.close();
  server.close();
});

describe("route of random quote of the user", () => {
  const URL_BASE = "/api/v1/quote";
  const createQuote = new CreateQuoteUseCases();

  test(`@GET ${URL_BASE}/:apiKey/random It should return the random quote correctly`, async () => {
    const quote = await createQuote.exec(mockQuote);
    const response = await request(app)
      .get(`${URL_BASE}/${apiKey}/random`)
      .expect(200);
  });
});
