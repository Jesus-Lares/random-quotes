import faker from "faker";
import QuoteBuilder from "../builders/quoteBuilder";

export default class QuoteFactory {
  static _createDefault() {
    const builder = new QuoteBuilder();
    builder.quote(faker.lorem.lines(3)).writer(faker.name.findName());
    return builder;
  }

  static createDefault() {
    const builder = QuoteFactory._createDefault();
    return builder.build();
  }
}
