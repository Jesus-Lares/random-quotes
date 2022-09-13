import ViewQuoteRepository from "@context/viewQuote/application/viewQuote.repository";

export default class FindOneViewQuoteUseCases {
  async exec(query: object) {
    const repository = new ViewQuoteRepository();
    const viewQuote = await repository.findOne(query);
    return viewQuote?.get() || null;
  }
}
