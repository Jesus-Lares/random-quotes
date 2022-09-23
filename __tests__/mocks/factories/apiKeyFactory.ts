import ApiKeyBuilder from "../builders/apiKeyBuilder";

export default class ApiKeyFactory {
  static _createDefault() {
    const builder = new ApiKeyBuilder();
    return builder;
  }

  static createDefault() {
    const builder = ApiKeyFactory._createDefault();
    return builder.build();
  }
}
