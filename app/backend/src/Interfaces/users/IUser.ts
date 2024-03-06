import { Entity, EntityLogin } from '../index';

export interface IUser extends Entity, EntityLogin {
  username: string;
  password: string;
  role: string;
}
