import { Sequelize } from "sequelize";
import { IRepository } from "@interface/IRepository";
import QuoteSchema from "../domain/QuoteSchema";

export default class UserRepository implements IRepository<QuoteSchema> {
  create(item: object): Promise<QuoteSchema> {
    return QuoteSchema.create({ ...item });
  }

  find(query: object): Promise<QuoteSchema[]> {
    return QuoteSchema.findAll({ where: { ...query }, raw: true });
  }

  findByUserAndRole(query: object): Promise<QuoteSchema[]> {
    return QuoteSchema.findAll({ where: Sequelize.or(query), raw: true });
  }

  findOne(query: object): Promise<QuoteSchema | null> {
    return QuoteSchema.findOne({ where: { ...query } });
  }

  findById(id: number): Promise<QuoteSchema | null> {
    return this.findOne({ id });
  }

  async update(id: number, item: object): Promise<QuoteSchema | null> {
    const user = await this.findById(id);
    if (!user) return null;
    return user.update({ ...item });
  }

  delete(params: object): Promise<Number | null> {
    return QuoteSchema.destroy({ where: { ...params } });
  }
}
