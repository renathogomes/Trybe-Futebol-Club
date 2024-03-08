import { Router, Request, Response } from 'express';

import UserController from '../controller/user.controller';
import ValidateLogin from '../middlewares/validateMiddleware';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  ValidateLogin.validateBody,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  ValidateLogin.validateToken,
  (req: Request, res: Response) => UserController.getRole(req, res),
);

export default router;
