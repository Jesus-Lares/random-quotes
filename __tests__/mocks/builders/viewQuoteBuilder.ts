import { ViewQuote } from "../../../src/context/viewQuote/domain/ViewQuote";

export default class ViewQuoteBuilder {
  private viewQuote: ViewQuote;

  private _viewQuote: ViewQuote;

  constructor() {
    this._viewQuote = {
      user: 0,
      quote: 0,
    };
    this.viewQuote = { ...this._viewQuote };
  }

  quote(quote: Number): ViewQuoteBuilder {
    this.viewQuote.quote = quote;
    return this;
  }

  user(user: Number): ViewQuoteBuilder {
    this.viewQuote.user = user;
    return this;
  }

  reset() {
    this.viewQuote = { ...this._viewQuote };
  }

  build(): ViewQuote {
    return this.viewQuote;
  }
}
