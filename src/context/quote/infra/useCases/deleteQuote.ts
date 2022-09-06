import QuoteRepository from "@context/quote/application/quote.repository";

export default class DeleteQuoteUseCases {
  exec(id: number) {
    const quoteRepository = new QuoteRepository();
    return quoteRepository.delete(id);
  }
}
