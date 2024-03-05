import { Router } from 'express';
import teamRouter from './team.routes';
import userLoginRouter from './login.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userLoginRouter);

export default router;
