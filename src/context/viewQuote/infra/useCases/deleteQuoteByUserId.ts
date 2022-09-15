import ViewQuoteRepository from "@context/viewQuote/application/viewQuote.repository";

export default class DeleteViewQuoteByUserIdUseCases {
  exec(user: number) {
    const repository = new ViewQuoteRepository();
    const params = { user };
    return repository.delete(params);
  }
}
