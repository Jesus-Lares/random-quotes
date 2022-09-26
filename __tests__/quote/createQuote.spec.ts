import sequelize from "../../src/config/database";
import { Quote } from "../../src/context/quote/domain/Quote";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import UserSchema from "../../src/context/user/domain/UserSchema";
import CreateQuote from "../../src/context/quote/infra/useCases/createQuote";
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

describe("Create quote useCase", () => {
  const createQuote = new CreateQuote();

  test("should return the quote with the correctly writer", async () => {
    const quote = await createQuote.exec(quoteMock);
    expect(quote.writer).toBe(quoteMock.writer);
  });

  test("should return an error if params are missing", async () => {
    const quote = createQuote.exec({} as Quote);
    await expect(quote).rejects.toThrow();
  });
});
