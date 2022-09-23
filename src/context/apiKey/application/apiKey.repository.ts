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

  findOne(query: object): Promise<ApiKeySchema | null> {
    return ApiKeySchema.findOne({ where: { ...query } });
  }

  delete(userId: number): Promise<Number | null> {
    return ApiKeySchema.destroy({ where: { userId } });
  }
}
