import ViewQuoteRepository from "@context/viewQuote/application/viewQuote.repository";
import { ViewQuote } from "@context/viewQuote/domain/ViewQuote";

export default class DeleteViewQuoteUseCases {
  exec(params: ViewQuote) {
    const repository = new ViewQuoteRepository();
    return repository.delete(params);
  }
}
