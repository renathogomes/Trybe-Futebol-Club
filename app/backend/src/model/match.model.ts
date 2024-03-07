import { IMatch } from '../Interfaces/match/IMatch';
import { IMatchModel } from '../Interfaces/match/IMatchModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeam';
import { MatchDefault } from '../Interfaces/match/MatchType';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatches;

  async createMatch(match: MatchDefault): Promise<IMatch> {
    const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId } = match;

    const newMatch = await this.model.create({
      awayTeamGoals,
      awayTeamId,
      homeTeamGoals,
      homeTeamId,
      inProgress: true });

    return newMatch;
  }

  async getAll(): Promise<IMatch[]> {
    const teams = await this.model.findAll({
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return teams;
  }

  async filteredMatches(query: string): Promise<IMatch[]> {
    const progress = JSON.parse(query);
    const teams = await this.model.findAll({
      where: { inProgress: progress },
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],

      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return teams;
  }

  async updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async endMatch(id: number): Promise<void> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}
