import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../model/user.model';

type LoginResponse = {
  token: string;
};

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(email: string, password: string): Promise<ServiceResponse<LoginResponse>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' },
      };
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string ?? 'secret',
    );
    return { status: 'SUCCESSFULL', data: { token } };
  }
}
