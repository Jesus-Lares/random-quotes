import DailyQuoteRepository from "../../application/dailyQuote.repository";

export default class FindDailyQuoteByUserIdUseCases {
  async exec(userId: number) {
    const repository = new DailyQuoteRepository();
    const dailyQuote = await repository.findByUser(userId);
    return dailyQuote?.get() || null;
  }
}
