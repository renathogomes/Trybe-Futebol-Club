import { Entity, EntityLogin } from '../index';

export interface IUser extends Entity, EntityLogin {
  name: string;
  password: string;
  role: string;
}
