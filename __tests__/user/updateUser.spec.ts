import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";

import CreateUser from "../../src/context/user/infra/useCases/createUser";
import UpdateUser from "../../src/context/user/infra/useCases/updateUser";
import UserFactory from "../mocks/factories/userFactory";

beforeAll(() => sequelize.sync());
beforeEach(() => UserSchema.destroy({ truncate: true }));
afterAll(() => sequelize.close());

describe("update user useCase", () => {
  const updateUser = new UpdateUser();
  const createUser = new CreateUser();
  const userMock = UserFactory.createDefault();
  const paramsToUpdate = {
    name: "updated name",
  };

  test("update user with correct params", async () => {
    const userCreated = await createUser.exec(userMock);
    const user = await updateUser.exec(userCreated.id, {
      ...userMock,
      ...paramsToUpdate,
    });
    expect(user?.name).toBe(paramsToUpdate.name);
  });

  test("it should return null if the user does not exist", async () => {
    const userId = 12;
    const user = await updateUser.exec(userId, {
      ...userMock,
      ...paramsToUpdate,
    });
    expect(user).toBeNull();
  });
});
