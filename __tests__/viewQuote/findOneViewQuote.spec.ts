import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";
import QuoteSchema from "../../src/context/quote/domain/QuoteSchema";
import ViewQuoteSchema from "../../src/context/viewQuote/domain/ViewQuoteSchema";
import { ViewQuote } from "../../src/context/viewQuote/domain/ViewQuote";
import FindViewQuote from "../../src/context/viewQuote/infra/useCases/findOneViewQuote";
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

describe("find one view quote useCase", () => {
  const findViewQuote = new FindViewQuote();
  const createViewQuote = new CreateViewQuote();

  test("it should return null if the view quote does not exist", async () => {
    const viewQuote = await findViewQuote.exec({});
    expect(viewQuote).toBeNull();
  });

  test("should be return a record with the user and quote", async () => {
    await createViewQuote.exec(viewQuoteMock);
    const viewQuote = await findViewQuote.exec(viewQuoteMock);
    expect(viewQuote.quote).toBe(viewQuoteMock.quote);
    expect(viewQuote.user).toBe(viewQuoteMock.user);
  });
});
