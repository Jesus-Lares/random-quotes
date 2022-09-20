/* eslint-disable indent */
/* eslint-disable brace-style */
import ApiKeySchema from "../domain/ApiKeySchema";
import { RepositoryApiKey } from "../domain/RepositoryApiKey";

export default class ApiKeyRepository
  implements RepositoryApiKey<ApiKeySchema>
{
  create(item: object): Promise<ApiKeySchema> {
    return ApiKeySchema.create({ ...item });
  }

  find(query: object): Promise<ApiKeySchema[]> {
    return ApiKeySchema.findAll({ ...query, raw: true });
  }

  findOne(query: object): Promise<ApiKeySchema | null> {
    return ApiKeySchema.findOne({ where: { ...query } });
  }

  async update(userId: number, item: object): Promise<ApiKeySchema | null> {
    const user = await this.findOne({ userId });
    if (!user) return null;
    return user.update({ ...item });
  }

  delete(userId: number): Promise<Number | null> {
    return ApiKeySchema.destroy({ where: { userId } });
  }
}
