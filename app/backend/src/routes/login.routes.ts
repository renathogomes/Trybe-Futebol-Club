import { Router } from 'express';

import UserController from '../controller/user.controller';

const userController = new UserController();

const router = Router();

router.post('/', (req, res) => userController.login(req, res));

router.get('/role', (req, res) => userController.getRole(req, res));

export default router;
