import MatchModel from '../model/match.model';
import { IMatch } from '../Interfaces/match/IMatch';
import { MatchDefault } from '../Interfaces/match/MatchType';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamService from './team.service';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
    private teamService = new TeamService(),
  ) { }

  public async createMatch(match: MatchDefault): Promise<ServiceResponse<IMatch>> {
    const { awayTeamId, homeTeamId } = match;
    const homeTeam = await this.teamService.getById(homeTeamId);
    const awayTeam = await this.teamService.getById(awayTeamId);

    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    if (homeTeam.status === 'NOT_FOUND' || awayTeam.status === 'NOT_FOUND') {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.createMatch(match);
    return { status: 'CREATED', data: newMatch };
  }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.getAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async filteredMatches(query: string): Promise<ServiceResponse<IMatch[]>> {
    const filteredMatches = await this.matchModel.filteredMatches(query);
    return { status: 'SUCCESSFUL', data: filteredMatches };
  }
}
