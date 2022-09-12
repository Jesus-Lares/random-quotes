/* eslint-disable indent */
/* eslint-disable brace-style */
import { RepositoryViewQuote } from "../domain/RepositoryViewQuote";
import { ViewQuote } from "../domain/ViewQuote";
import ViewQuoteSchema from "../domain/ViewQuoteSchema";

export default class UserRepository
  implements RepositoryViewQuote<ViewQuoteSchema>
{
  create(item: object): Promise<ViewQuoteSchema> {
    return ViewQuoteSchema.create({ ...item });
  }

  find(query: object): Promise<ViewQuoteSchema[]> {
    return ViewQuoteSchema.findAll({ ...query, raw: true });
  }

  findOne(query: object): Promise<ViewQuoteSchema | null> {
    return ViewQuoteSchema.findOne({ where: { ...query } });
  }

  delete(params: ViewQuote): Promise<Number | null> {
    return ViewQuoteSchema.destroy({ where: { ...params } });
  }
}
