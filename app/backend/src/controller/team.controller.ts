import { Request, Response } from 'express';
import TeamService from '../services/team.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const ServiceResponse = await this.teamService.getAllTeams();
    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const ServiceResponse = await this.teamService.getById(Number(req.params.id));
    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }
}
