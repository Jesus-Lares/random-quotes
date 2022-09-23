import sequelize from "../../src/config/database";
import ApiKeySchema from "../../src/context/apiKey/domain/ApiKeySchema";
import UserSchema from "../../src/context/user/domain/UserSchema";
import CreateApiKey from "../../src/context/apiKey/infra/useCases/createApiKey";
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

describe("Create api key of user useCase", () => {
  const createApiKey = new CreateApiKey();

  test("should return the apiKey", async () => {
    const apiKey = await createApiKey.exec(apiKeyMock);
    expect(apiKey).toHaveProperty("apiKey");
    expect(apiKey).toHaveProperty("userId");
    expect(apiKey.userId).toBe(apiKeyMock.userId);
  });

  test("should return an error if params are missing", async () => {
    const apiKey = createApiKey.exec({} as ApiKey);
    await expect(apiKey).rejects.toThrow();
  });
});
