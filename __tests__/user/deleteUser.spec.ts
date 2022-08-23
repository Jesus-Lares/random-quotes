import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";

import CreateUser from "../../src/context/user/infra/useCases/createUser";
import DeleteUser from "../../src/context/user/infra/useCases/deleteUser";
import UserFactory from "../mocks/factories/userFactory";

beforeAll(() => sequelize.sync());
beforeEach(() => UserSchema.destroy({ truncate: true }));
afterAll(() => sequelize.close());

describe("delete user useCase", () => {
  const createUser = new CreateUser();
  const deleteUser = new DeleteUser();

  test("delete user with correct params", async () => {
    const userMock = UserFactory.createDefault();
    const userCreated = await createUser.exec(userMock);
    const isDeleted = await deleteUser.exec(userCreated.id);
    expect(isDeleted).toBe(1);
  });

  test("it should return null if the client does not exist", async () => {
    const userId = 12;
    const user = await deleteUser.exec(userId);
    expect(user).toBe(0);
  });
});
