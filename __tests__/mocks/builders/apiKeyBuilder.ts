import {
  ApiKey,
  StatusApiKey,
} from "../../../src/context/apiKey/domain/ApiKey";

export default class ApiKeyBuilder {
  private apiKey: ApiKey;

  private _apiKey: ApiKey;

  constructor() {
    this._apiKey = {
      userId: 0,
      key: "",
      status: StatusApiKey.active,
    };
    this.apiKey = { ...this._apiKey };
  }

  key(key: string): ApiKeyBuilder {
    this.apiKey.key = key;
    return this;
  }

  userId(userId: number): ApiKeyBuilder {
    this.apiKey.userId = userId;
    return this;
  }

  status(status: StatusApiKey): ApiKeyBuilder {
    this.apiKey.status = status;
    return this;
  }

  reset() {
    this.apiKey = { ...this._apiKey };
  }

  build(): ApiKey {
    return this.apiKey;
  }
}
