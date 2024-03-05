export type NewEntity<T> = Omit<T, 'id'>;

export type Entity = {
  id: number;
};

export type EntityLogin = {
  email: string;
  password: string;
};
