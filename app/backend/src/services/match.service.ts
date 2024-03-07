import MatchModel from '../model/match.model';
import TeamModel from '../model/team.model';
import { IMatch } from '../Interfaces/match/IMatch';
import { MatchDefault } from '../Interfaces/match/MatchType';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) { }

  public async createMatch(match: MatchDefault): Promise<ServiceResponse<IMatch>> {
    const { awayTeamId, homeTeamId } = match;
    const homeTeam = await this.teamModel.findById(homeTeamId);
    const awayTeam = await this.teamModel.findById(awayTeamId);

    if (homeTeam === awayTeam) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
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
