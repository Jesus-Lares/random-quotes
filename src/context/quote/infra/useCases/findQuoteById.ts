import QuoteRepository from "@context/quote/application/quote.repository";

export default class FindQuoteByIdUseCases {
  async exec(id: number) {
    const quoteRepository = new QuoteRepository();
    const quote = await quoteRepository.findById(id);
    return quote?.get() || null;
  }
}
