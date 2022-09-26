import ApiKeyRepository from "../../application/apiKey.repository";

export default class FindOneApiKeyUseCases {
  async exec(query: object) {
    const repository = new ApiKeyRepository();
    const apiKey = await repository.findOne(query);
    return apiKey?.get() || null;
  }
}
