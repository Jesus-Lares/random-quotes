import QuoteRepository from "@context/quote/application/quote.repository";

export default class DeleteQuoteByUserIdUseCases {
  exec(user: number) {
    const quoteRepository = new QuoteRepository();
    return quoteRepository.delete({ user });
  }
}
