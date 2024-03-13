import { Router, Request, Response } from 'express';
import ControllerMatch from '../controller/match.controller';
import Validate from '../middlewares/validateMiddleware';

const router = Router();
const matchController = new ControllerMatch();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.post(
  '/',
  Validate.validateToken,
  Validate.validateTeam,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

router.patch(
  '/:id',
  Validate.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.patch(
  '/:id/finish',
  Validate.validateToken,
  (req: Request, res: Response) => matchController.endMatch(req, res),
);

export default router;
