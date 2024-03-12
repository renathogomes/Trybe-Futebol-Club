import { Request, Response } from 'express';
import TeamModel from '../model/team.model';
import MatchModel from '../model/match.model';
import LeaderBoardService from '../services/leadBoard.service';
import { ILeaderBoard } from '../Interfaces/leaderBoard/ILeaderBoard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
    private leaderboardService = new LeaderBoardService(teamModel, matchModel),
  ) {}

  public async getLeaderboard(req: Request, res: Response) {
    try {
      const { path } = req.params;
      const serviceResponse: ServiceResponse<ILeaderBoard[]> = await this
        .leaderboardService.getLeaderboard(path);

      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
