export interface RepositoryApiKey<T> {
  create(item: object): Promise<T>;
  find(query: T): Promise<T[]>;
  findOne(query: T): Promise<T | null>;
  update(userId: Number, item: T): Promise<T | null>;
  delete(userId: Number): Promise<Number | null>;
}
