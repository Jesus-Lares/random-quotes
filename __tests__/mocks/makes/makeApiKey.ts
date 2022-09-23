import CreateUser from "../../../src/context/user/infra/useCases/createUser";
import ApiKeyFactory from "../factories/apiKeyFactory";
import UserFactory from "../factories/userFactory";

const makeApiKey = async () => {
  const apiKey = ApiKeyFactory.createDefault();
  const createUser = new CreateUser();
  const userMock = UserFactory.createDefault();
  const user = await createUser.exec(userMock);
  return { ...apiKey, userId: user.id };
};

export default makeApiKey;
