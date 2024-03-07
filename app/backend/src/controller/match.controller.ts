import { Request, Response } from 'express';
import ServiceMatch from '../services/match.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService = new ServiceMatch()) { }

  public createMatch = async (req: Request, res: Response) => {
    const match = await this.matchService.createMatch(req.body);

    return res.status(mapStatusHTTP(match.status)).json(match.data);
  };

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (!inProgress) {
      const allMatches = await this.matchService.getAllMatches();
      return res.status(mapStatusHTTP(allMatches.status)).json(allMatches.data);
    }
    const inProgressMatches = await this.matchService.filteredMatches(inProgress.toString());

    return res.status(mapStatusHTTP(inProgressMatches.status)).json(inProgressMatches.data);
  };
}
