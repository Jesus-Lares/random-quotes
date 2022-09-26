import CreateUser from "../../../src/context/user/infra/useCases/createUser";
import ApiKeyFactory from "../factories/apiKeyFactory";
import UserFactory from "../factories/userFactory";

const makeApiKey = async () => {
  const userMock = UserFactory.createDefault();
  const apiKey = ApiKeyFactory.createDefault();
  const createUser = new CreateUser();
  const user = await createUser.exec(userMock);
  return { ...apiKey, userId: user.id };
};

export default makeApiKey;
