import faker from "faker";
import { UserRole } from "../../../src/context/user/domain/User";
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

  static _createWithAdminRole() {
    const builder = new UserBuilder();
    builder
      .name("Jesus Lares")
      .email(faker.internet.email())
      .password(faker.internet.password())
      .role(UserRole.admin);
    return builder;
  }

  static createDefaultWithAdminRole() {
    const builder = UserFactory._createWithAdminRole();
    return builder.build();
  }
}
