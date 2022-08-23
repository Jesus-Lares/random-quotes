import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";

import CreateUser from "../../src/context/user/infra/useCases/createUser";
import FindUser from "../../src/context/user/infra/useCases/findAllUsers";
import UserFactory from "../mocks/factories/userFactory";

beforeAll(() => sequelize.sync());
beforeEach(() => UserSchema.destroy({ truncate: true }));
afterAll(() => sequelize.close());

describe("Find all user useCase", () => {
  const userMock = UserFactory.createDefault();
  const findUser = new FindUser();
  const createUser = new CreateUser();

  test("should return all user type in the db", async () => {
    await createUser.exec(userMock);
    const userMocks = [userMock];
    const user = await findUser.exec({});
    expect(user.length).toBe(userMocks.length);
  });

  test("should return an empty array if there arent user", async () => {
    const user = await findUser.exec({});
    expect(user.length).toBe(0);
  });
});
