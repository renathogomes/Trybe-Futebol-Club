import { Router } from 'express';
import teamRouter from './team.routes';
import userLoginRouter from './login.routes';
import matchRouter from './match.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userLoginRouter);
router.use('/matches', matchRouter);

export default router;
