import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchsService from '../services/match.service';

export default class MatchsController {
  constructor(private matchService = new MatchsService()) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const result = await this.matchService.getAllMatches();
      return res.status(mapStatusHTTP(result.status)).json(result.data);
    }
    const result = await this.matchService.filteredMatches(inProgress.toString());
    return res.status(mapStatusHTTP(result.status)).json(result.data);
  }

  async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.matchService.endMatch(Number(id));
    return res.status(mapStatusHTTP(result.status)).json(result.data);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.matchService
      .updateMatch(Number(id), Number(req.body.homeTeamGoals), Number(req.body.awayTeamGoals));

    return res.status(mapStatusHTTP(result.status)).json(result.data);
  }

  async createMatch(req: Request, res: Response) {
    const result = await this.matchService.createMatch(req.body);

    return res.status(mapStatusHTTP(result.status)).json(result.data);
  }
}
