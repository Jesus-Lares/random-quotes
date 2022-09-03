import QuoteRepository from "@context/quote/application/quote.repository";
import { Quote } from "@context/quote/domain/Quote";

export default class CreateQuoteUseCases {
  async exec(item: Quote) {
    const repository = new QuoteRepository();
    const quoteCreated = await repository.create(item);
    return quoteCreated.get();
  }
}
