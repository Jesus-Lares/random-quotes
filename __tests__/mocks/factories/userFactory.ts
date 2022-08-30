import faker from "faker";
import UserBuilder from "../builders/userBuilder";

export default class UserFactory {
  static _createDefault() {
    const builder = new UserBuilder();
    builder
      .name("Jesus Lares")
      .email(faker.internet.email())
      .password(faker.internet.password());
    return builder;
  }

  static createDefault() {
    const builder = UserFactory._createDefault();
    return builder.build();
  }
}
