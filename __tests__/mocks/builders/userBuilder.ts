import { User } from "../../../src/context/user/domain/User";

export default class UserBuilder {
  private user: User;

  private _user: User;

  constructor() {
    this._user = {
      name: "",
      email: "",
      age: 0,
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

  age(age: number): UserBuilder {
    this.user.age = age;
    return this;
  }

  reset() {
    this.user = { ...this._user };
  }

  build(): User {
    return this.user;
  }
}
