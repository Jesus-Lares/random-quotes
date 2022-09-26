import sequelize from "../../src/config/database";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import UserSchema from "../../src/context/user/domain/UserSchema";
import CreateQuote from "../../src/context/quote/infra/useCases/createQuote";
import DeleteQuote from "../../src/context/quote/infra/useCases/deleteQuote";
import makeQuote from "../mocks/makes/makeQuote";

beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await QuoteSchema.destroy({ truncate: true });
  await UserSchema.destroy({ truncate: true });
});
afterAll(() => sequelize.close());

describe("delete quote useCase", () => {
  const createQuote = new CreateQuote();
  const deleteQuote = new DeleteQuote();

  test("delete quote with correct params", async () => {
    const quoteMock = await makeQuote();
    const quoteCreated = await createQuote.exec(quoteMock.quote);
    const isDeleted = await deleteQuote.exec(quoteCreated.id);
    expect(isDeleted).toBe(1);
  });

  test("it should return null if the quote does not exist", async () => {
    const quoteId = 12;
    const quote = await deleteQuote.exec(quoteId);
    expect(quote).toBe(0);
  });
});
