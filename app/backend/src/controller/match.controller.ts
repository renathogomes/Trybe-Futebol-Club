import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/match/IMatch';
import MatchModel from '../model/match.model';
import TeamService from '../services/team.service';

type FinishMessage = { message: 'Finished'; };
type UpdateMessage = { message: 'Updated'; };

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
    private teamService = new TeamService(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.getAll();
    if (!matches) return { status: 'NOT_FOUND', data: { message: 'Teams not found' } };

    return { status: 'SUCCESSFUL', data: matches };
  }

  async getFiltredMatches(query: string): Promise<ServiceResponse<IMatch[]>> {
    const matchsFiltred = await this.matchModel.filteredMatches(query);

    return { status: 'SUCCESSFUL', data: matchsFiltred };
  }

  async endMatch(id: number): Promise<ServiceResponse<FinishMessage>> {
    this.matchModel.endMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatch(
    homeGoals: number,
    awayGoals: number,
    id:number,
  ): Promise<ServiceResponse<UpdateMessage>> {
    await this.matchModel.updateMatch(homeGoals, awayGoals, id);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  async createMatch(matchParams: IMatch): Promise<ServiceResponse<IMatch>> {
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
