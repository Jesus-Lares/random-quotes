import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import { Quote } from "../../src/context/quote/domain/Quote";

import CreateQuote from "../../src/context/quote/infra/useCases/createQuote";
import FindQuote from "../../src/context/quote/infra/useCases/findOneQuote";
import makeQuote from "../mocks/makes/makeQuote";

let quoteMock: Quote;
beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await QuoteSchema.destroy({ truncate: true });
  await UserSchema.destroy({ truncate: true });
  quoteMock = await makeQuote();
});
afterAll(() => sequelize.close());

describe("find one quote useCase", () => {
  const findQuote = new FindQuote();
  const createQuote = new CreateQuote();

  test("it should return null if the quote does not exist", async () => {
    const quote = await findQuote.exec({});
    expect(quote).toBeNull();
  });

  test("should be return a record with the writer", async () => {
    await createQuote.exec(quoteMock);
    const quote = await findQuote.exec({
      writer: quoteMock.writer,
    });
    expect(quote.writer).toBe(quoteMock.writer);
  });
});
