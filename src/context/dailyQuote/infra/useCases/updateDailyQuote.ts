import DailyQuoteRepository from "../../application/dailyQuote.repository";

export default class UpdateDailyQuoteUseCases {
  async exec(id: number, item: object) {
    const repository = new DailyQuoteRepository();
    const dailyQuote = await repository.update(id, item);
    return dailyQuote?.get() || null;
  }
}
