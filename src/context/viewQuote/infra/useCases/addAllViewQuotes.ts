// eslint-disable-next-line import/no-unresolved
import FindByUserOrRole from "@context/quote/infra/useCases/findByUserOrRole";
import { UserRole } from "@context/user/domain/User";
import ViewQuoteRepository from "@context/viewQuote/application/viewQuote.repository";

export default class AddAllViewQuoteUseCases {
  async exec(userId: number, allQuotes = false) {
    const findQuotes = new FindByUserOrRole();
    const quotes = await findQuotes.exec({
      user: userId,
      ...(allQuotes && { role: UserRole.admin }),
    });
    if (!quotes.length) throw new Error("Not have quotes");
    const newViewQuotes = quotes.map((id) => ({ quote: id, user: userId }));
    const repository = new ViewQuoteRepository();
    return repository.createMultiple(newViewQuotes);
  }
}
