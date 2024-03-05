import { Entity, EntityLogin } from '../index';

export interface IUser extends Entity, EntityLogin {
  password: string;
  role: string;
}
