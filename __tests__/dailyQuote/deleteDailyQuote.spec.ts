import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import DailyQuoteSchema from "../../src/context/dailyQuote/domain/DailyQuoteSchema";
import { DailyQuote } from "../../src/context/dailyQuote/domain/DailyQuote";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import CreateDailyQuote from "../../src/context/dailyQuote/infra/useCases/createDailyQuote";
import DeleteDailyQuote from "../../src/context/dailyQuote/infra/useCases/deleteDailyQuote";
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

describe("delete daily quote useCase", () => {
  const createDailyQuote = new CreateDailyQuote();
  const deleteDailyQuote = new DeleteDailyQuote();

  test("delete daily quote with correct id", async () => {
    await createDailyQuote.exec(dailyQuoteMock);
    const isDeleted = await deleteDailyQuote.exec(dailyQuoteMock.userId);
    expect(isDeleted).toBe(1);
  });

  test("it should return null if the daily quote does not exist", async () => {
    const userId = 12;
    const dailyQuote = await deleteDailyQuote.exec(userId);
    expect(dailyQuote).toBe(0);
  });
});
