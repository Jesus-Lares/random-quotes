import generateApiKey from "generate-api-key";

import ApiKeyRepository from "../../application/apiKey.repository";
import { ApiKey } from "../../domain/ApiKey";

export default class CreateApiKeyUseCases {
  async exec(item: ApiKey) {
    const repository = new ApiKeyRepository();
    const apiKeyCreated = await repository.create({
      ...item,
      apiKey: generateApiKey({ method: "string", length: 8 }),
    });
    return apiKeyCreated.get();
  }
}
