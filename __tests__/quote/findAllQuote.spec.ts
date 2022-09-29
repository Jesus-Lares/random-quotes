import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import { Quote } from "../../src/context/quote/domain/Quote";

import CreateQuote from "../../src/context/quote/infra/useCases/createQuote";
import FindQuote from "../../src/context/quote/infra/useCases/findAllQuotes";
import makeQuote from "../mocks/makes/makeQuote";

let quoteMock: Quote;
beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await QuoteSchema.destroy({ truncate: true });
  await UserSchema.destroy({ truncate: true });
  const make = await makeQuote();
  quoteMock = make.quote;
});
afterAll(() => sequelize.close());

describe("Find all quotes useCase", () => {
  const findQuote = new FindQuote();
  const createQuote = new CreateQuote();

  test("should return all quotes type in the db", async () => {
    await createQuote.exec(quoteMock);
    const quoteMocks = [quoteMock];
    const quote = await findQuote.exec({});
    expect(quote.length).toBe(quoteMocks.length);
  });

  test("should return an empty array if there arent quote", async () => {
    const quote = await findQuote.exec({});
    expect(quote.length).toBe(0);
  });
});
