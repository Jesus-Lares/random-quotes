import sequelize from "../../src/config/database";
import { ViewQuote } from "../../src/context/viewQuote/domain/ViewQuote";
import ViewQuoteSchema from "../../src/context/viewQuote/domain/ViewQuoteSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import UserSchema from "../../src/context/user/domain/UserSchema";
import CreateViewQuote from "../../src/context/viewQuote/infra/useCases/createViewQuote";
import makeViewQuote from "../mocks/makes/makeUserAndQuote";

let viewQuoteMock: ViewQuote;
beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await ViewQuoteSchema.destroy({ truncate: true });
  await QuoteSchema.destroy({ truncate: true });
  await UserSchema.destroy({ truncate: true });
  viewQuoteMock = await makeViewQuote();
});
afterAll(() => sequelize.close());

describe("Create view quote useCase", () => {
  const createViewQuote = new CreateViewQuote();

  test("should return the view quote with the correctly writer", async () => {
    const viewQuote = await createViewQuote.exec(viewQuoteMock);
    expect(viewQuote.quote).toBe(viewQuoteMock.quote);
  });

  test("should return an error if params are missing", async () => {
    const viewQuote = createViewQuote.exec({} as ViewQuote);
    await expect(viewQuote).rejects.toThrow();
  });
});
