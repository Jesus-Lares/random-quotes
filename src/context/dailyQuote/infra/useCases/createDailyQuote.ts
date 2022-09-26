import { EXPIRETIME } from "@utils/constants";
import FormatDate from "@utils/formatDate";
import DailyQuoteRepository from "../../application/dailyQuote.repository";
import { DailyQuote } from "../../domain/DailyQuote";

export default class CreateDailyQuoteUseCases {
  async exec(item: DailyQuote) {
    const repository = new DailyQuoteRepository();
    const formatDate = new FormatDate();
    const expired = formatDate.generateExpiredDate({});
    console.log(expired);
    const dailyQuoteCreated = await repository.create({
      ...item,
      expired,
    });
    return dailyQuoteCreated.get();
  }
}
