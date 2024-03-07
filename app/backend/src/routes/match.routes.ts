import { Router, Request, Response } from 'express';
import ControllerMatch from '../controller/match.controller';

const router = Router();
const matchController = new ControllerMatch();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

export default router;
