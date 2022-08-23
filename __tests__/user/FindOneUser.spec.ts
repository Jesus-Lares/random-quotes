import sequelize from "../../src/config/database";
import UserSchema from "../../src/context/user/domain/UserSchema";

import CreateUser from "../../src/context/user/infra/useCases/createUser";
import FindUser from "../../src/context/user/infra/useCases/findOneUser";
import UserFactory from "../mocks/factories/userFactory";

beforeAll(() => sequelize.sync());
beforeEach(() => UserSchema.destroy({ truncate: true }));
afterAll(() => sequelize.close());

describe("find one client useCase", () => {
  const findUser = new FindUser();
  const createUser = new CreateUser();
  const mockuser = UserFactory.createDefault();

  test("it should return null if the user does not exist", async () => {
    const user = await findUser.exec({});
    expect(user).toBeNull();
  });

  test("should be return a record with the email", async () => {
    await createUser.exec(mockuser);
    const user = await findUser.exec({
      email: mockuser.email,
    });
    expect(user?.email).toBe(mockuser.email);
  });
});
