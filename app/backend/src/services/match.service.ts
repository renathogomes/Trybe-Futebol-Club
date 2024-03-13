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

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.getAll();

    if (!allMatches) {
      return { status: 'NOT_FOUND', data: { message: 'Teams not found' } };
    }

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async filteredMatches(query: string): Promise<ServiceResponse<IMatch[]>> {
    const filteredMatches = await this.matchModel.filteredMatches(query);
    return { status: 'SUCCESSFUL', data: filteredMatches };
  }

  public async updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number):
  Promise<ServiceResponse<{ message: 'Updated' }>> {
    await this.matchModel.updateMatch(homeTeamGoals, awayTeamGoals, id);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async endMatch(id: number): Promise<ServiceResponse<{ message: 'Finished' }>> {
    await this.matchModel.endMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async createMatch(matchParams: MatchDefault): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = matchParams;

    if (homeTeamId === awayTeamId) {
      return { status: 'UNPROCESSABLE_ENTITY',
        data:
      { message: 'It is not possible to create a match with two equal teams' } };
    }

    const homeExists = await this.teamService.getById(Number(homeTeamId));
    const awayExists = await this.teamService.getById(Number(awayTeamId));

    if (homeExists.status === 'NOT_FOUND' || awayExists.status === 'NOT_FOUND') {
      return { status: 'NOT_FOUND',
        data:
      { message: 'There is no team with such id!' } };
    }

    const match = await this.matchModel.createMatch(matchParams);

    return { status: 'CREATED', data: match };
  }
}
