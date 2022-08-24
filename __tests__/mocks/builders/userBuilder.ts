import { User } from "../../../src/context/user/domain/User";

export default class UserBuilder {
  private user: User;

  private _user: User;

  constructor() {
    this._user = {
      name: "",
      email: "",
      password: "",
    };
    this.user = { ...this._user };
  }

  name(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  email(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  password(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  reset() {
    this.user = { ...this._user };
  }

  build(): User {
    return this.user;
  }
}
