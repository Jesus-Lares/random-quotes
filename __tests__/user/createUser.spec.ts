import sequelize from "../../src/config/database";
import { User } from "../../src/context/user/domain/User";
import UserSchema from "../../src/context/user/domain/UserSchema";
import CreateUser from "../../src/context/user/infra/useCases/createUser";
import UserFactory from "../mocks/factories/userFactory";

beforeAll(() => sequelize.sync());
beforeEach(() => UserSchema.destroy({ truncate: true }));
afterAll(() => sequelize.close());

describe("Create user useCase", () => {
  const createUser = new CreateUser();
  const userMock = UserFactory.createDefault();

  test("should return the user with the correctly name", async () => {
    const user = await createUser.exec(userMock);
    expect(user.name).toBe(userMock.name);
  });

  test("should return an error if params are missing", async () => {
    const user = createUser.exec({} as User);
    await expect(user).rejects.toThrow();
  });
});
