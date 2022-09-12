import ViewQuoteBuilder from "../builders/viewQuoteBuilder";

export default class ViewQuoteFactory {
  static _createDefault() {
    const builder = new ViewQuoteBuilder();
    return builder;
  }

  static createDefault() {
    const builder = ViewQuoteFactory._createDefault();
    return builder.build();
  }
}
