import { IRepository } from "@interface/IRepository";
import ViewQuoteSchema from "../domain/ViewQuoteSchema";

export default class UserRepository implements IRepository<ViewQuoteSchema> {
  create(item: object): Promise<ViewQuoteSchema> {
    return ViewQuoteSchema.create({ ...item });
  }

  find(query: object): Promise<ViewQuoteSchema[]> {
    return ViewQuoteSchema.findAll({ ...query, raw: true });
  }

  findOne(query: object): Promise<ViewQuoteSchema | null> {
    return ViewQuoteSchema.findOne({ where: { ...query } });
  }

  findById(id: number): Promise<ViewQuoteSchema | null> {
    return this.findOne({ id });
  }

  async update(id: number, item: object): Promise<ViewQuoteSchema | null> {
    const user = await this.findById(id);
    if (!user) return null;
    return user.update({ ...item });
  }

  delete(id: number): Promise<Number | null> {
    return ViewQuoteSchema.destroy({ where: { id } });
  }
}
