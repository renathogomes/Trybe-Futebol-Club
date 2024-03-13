import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderBoard.service';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboard(req: Request, res: Response) {
    const { subroute } = req.params;
    const serviceResponse = await this.leaderboardService.getLeaderboard(subroute?.toLowerCase());
    return res.status(200).json(serviceResponse.data);
  }
}
