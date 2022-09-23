import sequelize from "../../src/config/database";
import ApiKeySchema from "../../src/context/apiKey/domain/ApiKeySchema";
import UserSchema from "../../src/context/user/domain/UserSchema";
import CreateApiKey from "../../src/context/apiKey/infra/useCases/createApiKey";
import DeleteApiKey from "../../src/context/apiKey/infra/useCases/deleteApiKey";
import makeApiKey from "../mocks/makes/makeApiKey";

beforeAll(() => sequelize.sync());
beforeEach(async () => {
  await UserSchema.destroy({ truncate: true });
  await ApiKeySchema.destroy({ truncate: true });
});
afterAll(() => sequelize.close());

describe("delete view quote useCase", () => {
  const createApiKey = new CreateApiKey();
  const deleteApiKey = new DeleteApiKey();

  test("delete api key with correct id", async () => {
    const apiKeyMock = await makeApiKey();
    await createApiKey.exec(apiKeyMock);
    const isDeleted = await deleteApiKey.exec(apiKeyMock.userId);
    expect(isDeleted).toBe(1);
  });

  test("it should return null if the apiKey does not exist", async () => {
    const userId = 12;
    const apiKey = await deleteApiKey.exec(userId);
    expect(apiKey).toBe(0);
  });
});
