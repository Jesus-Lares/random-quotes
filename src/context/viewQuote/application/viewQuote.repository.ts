/* eslint-disable indent */
/* eslint-disable brace-style */
import { RepositoryViewQuote } from "../domain/RepositoryViewQuote";
import ViewQuoteSchema from "../domain/ViewQuoteSchema";

export default class UserRepository
  implements RepositoryViewQuote<ViewQuoteSchema>
{
  create(item: object): Promise<ViewQuoteSchema> {
    return ViewQuoteSchema.create({ ...item });
  }

  createMultiple(items: readonly any[]): Promise<ViewQuoteSchema[]> {
    return ViewQuoteSchema.bulkCreate(items);
  }

  find(query: object): Promise<ViewQuoteSchema[]> {
    return ViewQuoteSchema.findAll({ ...query, raw: true });
  }

  findOne(query: object): Promise<ViewQuoteSchema | null> {
    return ViewQuoteSchema.findOne({ where: { ...query } });
  }

  delete(params: object): Promise<Number | null> {
    return ViewQuoteSchema.destroy({ where: { ...params } });
  }
}
