import { Router } from 'express';

import UserController from '../controller/user.controller';
import ValidateLogin from '../middlewares/validateMiddleware';

const userController = new UserController();

const router = Router();

router.post('/', ValidateLogin.validateBody, (req, res) => userController.login(req, res));

router.get('/role', ValidateLogin.validateToken, (req, res) => userController.getRole(req, res));

export default router;
