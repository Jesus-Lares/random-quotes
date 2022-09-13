import ViewQuoteRepository from "@context/viewQuote/application/viewQuote.repository";
import { ViewQuote } from "@context/viewQuote/domain/ViewQuote";

export default class CreateViewQuoteUseCases {
  async exec(item: ViewQuote) {
    const repository = new ViewQuoteRepository();
    const viewQuoteCreated = await repository.create(item);
    return viewQuoteCreated.get();
  }
}
