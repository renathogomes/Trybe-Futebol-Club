import { IMatch } from '../Interfaces/match/IMatch';
import { ITeam } from '../Interfaces/teams/ITeam';
import TeamModel from '../model/team.model';
import MatchModel from '../model/match.model';
import { ILeaderBoard } from '../Interfaces/leaderBoard/ILeaderBoard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { getAllTeamStats } from '../utils/leadboard';

export default class LeaderBoardService {
  constructor(private model: TeamModel, private matchModel: MatchModel) {}

  public static async getLeaderBoard(teams: ILeaderBoard[]): Promise<ILeaderBoard[]> {
    return teams.sort((a, b) => {
      const totalPointsComparison = b.totalPoints - a.totalPoints;
      if (totalPointsComparison !== 0) {
        return totalPointsComparison;
      }

      const goalsBalanceComparison = b.goalsBalance - a.goalsBalance;
      if (goalsBalanceComparison !== 0) {
        return goalsBalanceComparison;
      }

      return b.goalsFavor - a.goalsFavor;
    });
  }

  static getInfo(matches: IMatch[], teams: ITeam[], path: string): ILeaderBoard[] {
    const matchesByTeamId: Record<string, IMatch[]> = matches.reduce((acc, match) => {
      if (path === 'home') {
        if (!acc[match.homeTeamId]) {
          acc[match.homeTeamId] = [];
        }
        acc[match.homeTeamId].push(match);
      } else if (path === 'away') {
        if (!acc[match.awayTeamId]) {
          acc[match.awayTeamId] = [];
        }
        acc[match.awayTeamId].push(match);
      }
      return acc;
    }, {} as Record<string, IMatch[]>);
    return teams.map((team) => ({
      name: team.teamName,
      ...getAllTeamStats(matchesByTeamId[team.id] || [], team.id),
    }));
  }

  public async getLeaderboard(path: string): Promise<ServiceResponse<ILeaderBoard[]>> {
    try {
      const teams = await this.model.findAll();
      const matchesFilter = await this.matchModel.filteredMatches('false');

      const allTeams = LeaderBoardService.getInfo(matchesFilter, teams, path);

      return { status: 'SUCCESSFUL', data: allTeams };
    } catch (error) {
      return { status: 'NOT_FOUND', data: { message: 'Unknown error occurred' } };
    }
  }
}
