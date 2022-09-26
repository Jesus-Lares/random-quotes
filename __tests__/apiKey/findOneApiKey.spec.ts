import sequelize from "../../src/config/database";
import ApiKeySchema from "../../src/context/apiKey/domain/ApiKeySchema";
import UserSchema from "../../src/context/user/domain/UserSchema";
import CreateApiKey from "../../src/context/apiKey/infra/useCases/createApiKey";
import FindApiKey from "../../src/context/apiKey/infra/useCases/findOneApiKey";
import { ApiKey } from "../../src/context/apiKey/domain/ApiKey";
import makeApiKey from "../mocks/makes/makeApiKey";

let apiKeyMock: ApiKey;
beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await UserSchema.destroy({ truncate: true });
  await ApiKeySchema.destroy({ truncate: true });
  apiKeyMock = await makeApiKey();
});
afterAll(() => sequelize.close());

describe("find one api Key useCase", () => {
  const findApiKey = new FindApiKey();
  const createApiKey = new CreateApiKey();

  test("it should return null if the api key does not exist", async () => {
    const apiKey = await findApiKey.exec({});
    expect(apiKey).toBeNull();
  });

  test("should be return a record with the user id", async () => {
    await createApiKey.exec(apiKeyMock);
    const apiKey = await findApiKey.exec({ userId: apiKeyMock.userId });
    expect(apiKey.userId).toBe(apiKeyMock.userId);
  });
});
