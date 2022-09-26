/* eslint-disable indent */
/* eslint-disable brace-style */
import DailyQuoteSchema from "../domain/DailyQuoteSchema";
import { RepositoryDailyQuote } from "../domain/RepositoryDailyQuote";

export default class DailyQuoteRepository
  implements RepositoryDailyQuote<DailyQuoteSchema>
{
  create(item: object): Promise<DailyQuoteSchema> {
    return DailyQuoteSchema.create({ ...item });
  }

  findByUser(userId: number): Promise<DailyQuoteSchema | null> {
    return DailyQuoteSchema.findOne({ where: { userId } });
  }

  async update(userId: number, item: object): Promise<DailyQuoteSchema | null> {
    const dailyQuote = await this.findByUser(userId);
    if (!dailyQuote) return null;
    return dailyQuote.update({ ...item });
  }

  delete(userId: number): Promise<Number | null> {
    return DailyQuoteSchema.destroy({ where: { userId } });
  }
}
