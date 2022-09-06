import QuoteRepository from "@context/quote/application/quote.repository";

export default class FindOneQuoteUseCases {
  async exec(query: object) {
    const quoteRepository = new QuoteRepository();
    const quote = await quoteRepository.findOne(query);
    return quote?.get() || null;
  }
}
