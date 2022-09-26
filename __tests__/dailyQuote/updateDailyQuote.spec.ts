import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import DailyQuoteSchema from "../../src/context/dailyQuote/domain/DailyQuoteSchema";
import { DailyQuote } from "../../src/context/dailyQuote/domain/DailyQuote";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import CreateDailyQuote from "../../src/context/dailyQuote/infra/useCases/createDailyQuote";
import UpdateDailyQuote from "../../src/context/dailyQuote/infra/useCases/updateDailyQuote";
import FormatDate from "../../src/utils/formatDate";
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

describe("update daily quote useCase", () => {
  const updateDailyQuote = new UpdateDailyQuote();
  const createDailyQuote = new CreateDailyQuote();
  const formatDate = new FormatDate();
  const paramsToUpdate = {
    quote: 2,
    expired: formatDate.generateExpiredDate({}),
  };

  test("update daily quote with correct params", async () => {
    const dailyQuoteCreated = await createDailyQuote.exec(dailyQuoteMock);
    const dailyQuote = await updateDailyQuote.exec(
      dailyQuoteCreated.userId,
      paramsToUpdate
    );
    expect(dailyQuote.quote).toBe(paramsToUpdate.quote);
    expect(dailyQuote.expired).toBe(paramsToUpdate.expired);
  });

  test("it should return null if the daily quote does not exist", async () => {
    const quoteId = 12;
    const dailyQuote = await updateDailyQuote.exec(quoteId, paramsToUpdate);
    expect(dailyQuote).toBeNull();
  });
});
