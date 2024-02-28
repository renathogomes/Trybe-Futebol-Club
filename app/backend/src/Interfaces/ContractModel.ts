export interface ContractModelCreate<T> {
  create(data: Partial<T>): Promise<T>;
}

export interface ContractModelRead<T> {
  findAll(): Promise<T[]>;
}
