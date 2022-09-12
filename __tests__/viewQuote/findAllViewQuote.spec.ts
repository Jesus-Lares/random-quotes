import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import { ViewQuote } from "../../src/context/viewQuote/domain/ViewQuote";
import ViewQuoteSchema from "../../src/context/viewQuote/domain/ViewQuoteSchema";
import FindViewQuote from "../../src/context/viewQuote/infra/useCases/findAllViewQuotes";
import CreateViewQuote from "../../src/context/viewQuote/infra/useCases/createViewQuote";
import makeViewQuote from "../mocks/makes/makeViewQuote";

let viewQuoteMock: ViewQuote;
beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await ViewQuoteSchema.destroy({ truncate: true });
  await QuoteSchema.destroy({ truncate: true });
  await UserSchema.destroy({ truncate: true });
  viewQuoteMock = await makeViewQuote();
});
afterAll(() => sequelize.close());

describe("Find all view quotes useCase", () => {
  const findViewQuote = new FindViewQuote();
  const createViewQuote = new CreateViewQuote();

  test("should return all view quotes type in the db", async () => {
    await createViewQuote.exec(viewQuoteMock);
    const viewQuoteMocks = [viewQuoteMock];
    const viewQuote = await findViewQuote.exec({});
    expect(viewQuote.length).toBe(viewQuoteMocks.length);
  });

  test("should return an empty array if there arent view quote", async () => {
    const viewQuote = await findViewQuote.exec({});
    expect(viewQuote.length).toBe(0);
  });
});
