import ViewQuoteRepository from "@context/viewQuote/application/viewQuote.repository";

export default class FindAllViewQuotesUseCases {
  exec(query: object) {
    const repository = new ViewQuoteRepository();
    return repository.find(query);
  }
}
