import { ViewQuote } from "./ViewQuote";

export interface RepositoryViewQuote<T> {
  create(item: object): Promise<T>;
  find(query: T): Promise<T[]>;
  findOne(query: T): Promise<T | null>;
  delete(params: ViewQuote): Promise<Number | null>;
}
