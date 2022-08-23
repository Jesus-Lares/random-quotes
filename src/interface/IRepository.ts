export interface IRepository<T> {
  create(item: object): Promise<T>;
  find(query: T): Promise<T[]>;
  findOne(query: T): Promise<T | null>;
  findById(id: Number): Promise<T | null>;
  update(id: Number, item: T): Promise<T | null>;
  delete(id: Number): Promise<Number | null>;
}
