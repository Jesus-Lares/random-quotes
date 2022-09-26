export interface RepositoryDailyQuote<T> {
  create(item: object): Promise<T>;
  findByUser(userId: Number): Promise<T | null>;
  update(id: Number, item: object): Promise<T | null>;
  delete(userId: Number): Promise<Number | null>;
}
