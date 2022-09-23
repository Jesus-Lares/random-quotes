import ApiKeyRepository from "../../application/apiKey.repository";

export default class DeleteApiKeyUseCases {
  exec(userId: number) {
    const repository = new ApiKeyRepository();
    return repository.delete(userId);
  }
}
