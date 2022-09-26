import CreateUser from "../../../src/context/user/infra/useCases/createUser";
import QuoteFactory from "../factories/quoteFactory";
import UserFactory from "../factories/userFactory";

const makeQuote = async () => {
  const quote = QuoteFactory.createDefault();
  const createUser = new CreateUser();
  const userMock = UserFactory.createDefault();
  const user = await createUser.exec(userMock);
  return { quote: { ...quote, user: user.id, role: user.role }, user };
};

export default makeQuote;
