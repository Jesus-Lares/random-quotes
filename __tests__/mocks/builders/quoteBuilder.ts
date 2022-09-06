import { Quote } from "../../../src/context/quote/domain/Quote";
import { UserRole } from "../../../src/context/user/domain/User";

export default class QuoteBuilder {
  private quoteBuild: Quote;

  private _quoteBuild: Quote;

  constructor() {
    this._quoteBuild = {
      quote: "",
      writer: "",
      role: UserRole.client,
      user: 0,
    };
    this.quoteBuild = { ...this._quoteBuild };
  }

  quote(quote: string): QuoteBuilder {
    this.quoteBuild.quote = quote;
    return this;
  }

  writer(writer: string): QuoteBuilder {
    this.quoteBuild.writer = writer;
    return this;
  }

  role(role: UserRole): QuoteBuilder {
    this.quoteBuild.role = role;
    return this;
  }

  user(user: Number): QuoteBuilder {
    this.quoteBuild.user = user;
    return this;
  }

  reset() {
    this.quoteBuild = { ...this._quoteBuild };
  }

  build(): Quote {
    return this.quoteBuild;
  }
}
