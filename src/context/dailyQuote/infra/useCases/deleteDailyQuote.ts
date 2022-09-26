import DailyQuoteRepository from "../../application/dailyQuote.repository";

export default class DeleteDailyQuoteUseCases {
  exec(userId: number) {
    const repository = new DailyQuoteRepository();
    return repository.delete(userId);
  }
}
