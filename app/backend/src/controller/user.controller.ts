import { Request, Response } from 'express';
import UserService from '../services/user.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const ServiceResponse = await this.userService.login(req.body.email, req.body.password);
    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }

  public static async getRole(_req:Request, res:Response) {
    const { role } = res.locals.auth;
    return res.status(200).json({ role });
  }
}
