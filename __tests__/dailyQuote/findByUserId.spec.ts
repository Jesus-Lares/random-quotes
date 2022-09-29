import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import DailyQuoteSchema from "../../src/context/dailyQuote/domain/DailyQuoteSchema";
import { DailyQuote } from "../../src/context/dailyQuote/domain/DailyQuote";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import CreateDailyQuote from "../../src/context/dailyQuote/infra/useCases/createDailyQuote";
import FindDailyQuote from "../../src/context/dailyQuote/infra/useCases/findByUserId";
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

describe("find daily quote by user id useCase", () => {
  const findDailyQuote = new FindDailyQuote();
  const createDailyQuote = new CreateDailyQuote();

  test("it should return null if the daily quote does not exist", async () => {
    const dailyQuote = await findDailyQuote.exec(12);
    expect(dailyQuote).toBeNull();
  });

  test("should be return a record with the user id", async () => {
    await createDailyQuote.exec(dailyQuoteMock);
    const dailyQuote = await findDailyQuote.exec(dailyQuoteMock.userId);
    expect(dailyQuote.userId).toBe(dailyQuoteMock.userId);
  });
});
