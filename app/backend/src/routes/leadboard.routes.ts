import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controller/leaderBoard.controller';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/:subroute?',
  (req: Request, res: Response) => leaderBoardController.getLeaderboard(req, res),
);

export default router;
