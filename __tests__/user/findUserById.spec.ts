import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";

import CreateUser from "../../src/context/user/infra/useCases/createUser";
import FindUserById from "../../src/context/user/infra/useCases/findUserById";
import UserFactory from "../mocks/factories/userFactory";

beforeAll(() => sequelize.sync());
beforeEach(() => UserSchema.destroy({ truncate: true }));
afterAll(() => sequelize.close());

describe("find client by id useCase", () => {
  const findUserById = new FindUserById();
  const createUser = new CreateUser();
  const userFactory = UserFactory.createDefault();

  test("it should return null if the user does not exist", async () => {
    const userId = 12;
    const user = await findUserById.exec(userId);
    expect(user).toBeNull();
  });

  test("It should return the user name with the id that we are requesting", async () => {
    const { name, id } = await createUser.exec(userFactory);
    const user = await findUserById.exec(id);
    expect(user?.name).toBe(name);
  });
});
