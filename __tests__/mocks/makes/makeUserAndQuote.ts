import CreateQuote from "../../../src/context/quote/infra/useCases/createQuote";
import makeQuote from "./makeQuote";

const makeUserAndQuote = async () => {
  const { quote: quoteMock } = await makeQuote();
  const createQuote = new CreateQuote();
  const quote = await createQuote.exec(quoteMock);
  return { user: quote.user, quote: quote.id };
};

export default makeUserAndQuote;
