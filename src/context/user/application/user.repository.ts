import { IRepository } from "@interface/IRepository";
import UserSchema from "../domain/UserSchema";

export default class UserRepository implements IRepository<UserSchema> {
  create(item: object): Promise<UserSchema> {
    return UserSchema.create({ ...item });
  }

  find(query: object): Promise<UserSchema[]> {
    return UserSchema.findAll({ ...query, raw: true });
  }

  findOne(query: object): Promise<UserSchema | null> {
    return UserSchema.findOne({ where: { ...query } });
  }

  findById(id: number): Promise<UserSchema | null> {
    return this.findOne({ id });
  }

  async update(id: number, item: object): Promise<UserSchema | null> {
    const user = await this.findById(id);
    if (!user) return null;
    return user.update({ ...item });
  }

  delete(id: number): Promise<Number | null> {
    return UserSchema.destroy({ where: { id } });
  }
}
