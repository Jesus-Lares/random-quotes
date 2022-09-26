export interface RepositoryApiKey<T> {
  create(item: object): Promise<T>;
  findOne(query: T): Promise<T | null>;
  delete(userId: Number): Promise<Number | null>;
}
