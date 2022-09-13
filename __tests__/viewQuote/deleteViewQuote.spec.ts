import sequelize from "../../src/config/database";
import ViewQuoteSchema from "../../src/context/viewQuote/domain/ViewQuoteSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import UserSchema from "../../src/context/user/domain/UserSchema";
import CreateViewQuote from "../../src/context/viewQuote/infra/useCases/createViewQuote";
import DeleteViewQuote from "../../src/context/viewQuote/infra/useCases/deleteViewQuote";
import makeViewQuote from "../mocks/makes/makeViewQuote";

beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await ViewQuoteSchema.destroy({ truncate: true });
  await QuoteSchema.destroy({ truncate: true });
  await UserSchema.destroy({ truncate: true });
});
afterAll(() => sequelize.close());

describe("delete view quote useCase", () => {
  const createViewQuote = new CreateViewQuote();
  const deleteViewQuote = new DeleteViewQuote();

  test("delete view quote with correct params", async () => {
    const viewQuoteMock = await makeViewQuote();
    await createViewQuote.exec(viewQuoteMock);
    const isDeleted = await deleteViewQuote.exec(viewQuoteMock);
    expect(isDeleted).toBe(1);
  });

  test("it should return null if the view quote does not exist", async () => {
    const viewQuoteId = { quote: 12, user: 12 };
    const viewQuote = await deleteViewQuote.exec(viewQuoteId);
    expect(viewQuote).toBe(0);
  });
});
