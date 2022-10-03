import QuoteRepository from "@context/quote/application/quote.repository";
import { UserRole } from "@context/user/domain/User";

export default class FindByUserOrRole {
  async exec(query: { user: number; role?: UserRole }) {
    const quoteRepository = new QuoteRepository();
    return quoteRepository.findByUserAndRole(query);
  }
}
