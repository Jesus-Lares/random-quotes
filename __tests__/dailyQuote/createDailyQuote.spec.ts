import sequelize from "../../src/config/database";
import DailyQuoteSchema from "../../src/context/dailyQuote/domain/DailyQuoteSchema";
import { DailyQuote } from "../../src/context/dailyQuote/domain/DailyQuote";
import UserSchema from "../../src/context/user/domain/UserSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import CreateDailyQuoteUseCases from "../../src/context/dailyQuote/infra/useCases/createDailyQuote";
import makeUserAndQuote from "../mocks/makes/makeUserAndQuote";

let dailyQuoteMock: DailyQuote;
beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await UserSchema.destroy({ truncate: true });
  await QuoteSchema.destroy({ truncate: true });
  await DailyQuoteSchema.destroy({ truncate: true });
  const { user, quote } = await makeUserAndQuote();
  dailyQuoteMock = {
    userId: user,
    quote,
  };
});
afterAll(() => sequelize.close());

describe("Create daily Quote of user useCase", () => {
  const createDailyQuote = new CreateDailyQuoteUseCases();

  test("should return the daily quote", async () => {
    const dailyQuote = await createDailyQuote.exec(dailyQuoteMock);
    expect(dailyQuote).toHaveProperty("expired");
    expect(dailyQuote).toHaveProperty("userId");
    expect(dailyQuote).toHaveProperty("quote");
    expect(dailyQuote.userId).toBe(dailyQuote.userId);
  });

  test("should return an error if params are missing", async () => {
    const dailyQuote = createDailyQuote.exec({} as DailyQuote);
    await expect(dailyQuote).rejects.toThrow();
  });
});
