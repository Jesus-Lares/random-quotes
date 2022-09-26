import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import { Quote } from "../../src/context/quote/domain/Quote";

import CreateQuote from "../../src/context/quote/infra/useCases/createQuote";
import UpdateQuote from "../../src/context/quote/infra/useCases/updateQuote";
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

describe("update quote useCase", () => {
  const updateQuote = new UpdateQuote();
  const createQuote = new CreateQuote();
  const paramsToUpdate = {
    writer: "updated name",
  };

  test("update quote with correct params", async () => {
    const quoteCreated = await createQuote.exec(quoteMock);
    const quote = await updateQuote.exec(quoteCreated.id, {
      ...quoteMock,
      ...paramsToUpdate,
    });
    expect(quote.writer).toBe(paramsToUpdate.writer);
  });

  test("it should return null if the quote does not exist", async () => {
    const quoteId = 12;
    const quote = await updateQuote.exec(quoteId, {
      ...quoteMock,
      ...paramsToUpdate,
    });
    expect(quote).toBeNull();
  });
});
