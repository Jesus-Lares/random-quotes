import QuoteRepository from "@context/quote/application/quote.repository";

export default class FindAllQuotesUseCases {
  exec(query: object) {
    const quoteRepository = new QuoteRepository();
    return quoteRepository.find(query);
  }
}
