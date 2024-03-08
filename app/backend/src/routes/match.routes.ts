import { Router, Request, Response } from 'express';
import ControllerMatch from '../controller/match.controller';

const router = Router();
const matchController = new ControllerMatch();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.post('/', (req: Request, res: Response) => matchController.createMatch(req, res));

router.patch('/:id', (req: Request, res: Response) => matchController.updateMatch(req, res));

router.patch('/:id/finish', (req: Request, res: Response) => matchController.endMatch(req, res));

export default router;
