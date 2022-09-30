import CreateQuoteUseCases from "../../../src/context/quote/infra/useCases/createQuote";
import FindUser from "../../../src/context/user/infra/useCases/findUserById";
import { EXPIRETIME } from "../../../src/utils/constants";
import FormatDate from "../../../src/utils/formatDate";
import QuoteFactory from "../factories/quoteFactory";

const makeQuoteWithUserId = async (userId: number, isExpired = false) => {
  let expired;
  const quoteMock = QuoteFactory.createDefault();
  const findUser = new FindUser();
  const user = await findUser.exec(userId);
  quoteMock.user = user.id;
  quoteMock.role = user.role;
  const createQuote = new CreateQuoteUseCases();
  const quote = await createQuote.exec(quoteMock);
  if (isExpired) {
    const formatDate = new FormatDate();
    expired = formatDate.generateExpiredDate({
      expiresIn: EXPIRETIME.H24 * -2,
    });
  }
  return { userId, quote: quote.id, expired };
};

export default makeQuoteWithUserId;
