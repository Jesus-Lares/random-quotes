import QuoteRepository from "@context/quote/application/quote.repository";
import { Quote } from "@context/quote/domain/Quote";

export default class UpdateQuoteUseCases {
  async exec(id: number, item: Quote) {
    const quoteRepository = new QuoteRepository();
    const quote = await quoteRepository.update(id, item);
    return quote?.get() || null;
  }
}
