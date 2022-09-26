import CreateUser from "../../../src/context/user/infra/useCases/createUser";
import UserFactory from "../factories/userFactory";
import makeToken from "./makeToken";

const makeTokenForApiKey = async () => {
  const createUser = new CreateUser();
  const userMock = UserFactory.createDefault();
  const user = await createUser.exec(userMock);
  const token = await makeToken(user.id, user.name);

  return { token, userId: user.id };
};

export default makeTokenForApiKey;
