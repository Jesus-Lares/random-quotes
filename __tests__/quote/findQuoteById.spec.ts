import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import { Quote } from "../../src/context/quote/domain/Quote";

import CreateQuote from "../../src/context/quote/infra/useCases/createQuote";
import FindQuote from "../../src/context/quote/infra/useCases/findQuoteById";
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

describe("find quote by id useCase", () => {
  const findQuote = new FindQuote();
  const createQuote = new CreateQuote();

  test("it should return null if the quote does not exist", async () => {
    const quoteId = 12;
    const quote = await findQuote.exec(quoteId);
    expect(quote).toBeNull();
  });

  test("It should return the quote with the id that we are requesting", async () => {
    const { writer, id } = await createQuote.exec(quoteMock);
    const quote = await findQuote.exec(id);
    expect(quote?.writer).toBe(writer);
  });
});
