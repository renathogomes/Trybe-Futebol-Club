import { IMatch } from '../Interfaces/match/IMatch';
import { ITeam } from '../Interfaces/teams/ITeam';
import { getAllInfo } from '../utils/leadboard';
import TeamModel from '../model/team.model';
import MatchesModel from '../model/match.model';
import { ILeaderBoard } from '../Interfaces/leaderBoad/ILeaderBoard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchesModel = new MatchesModel(),
  ) { }

  static orderLeaderboard(teams: ILeaderBoard[]): ILeaderBoard[] {
    return teams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
  }

  static getInfo(matches: IMatch[], teams: ITeam[], path: string): ILeaderBoard[] {
    const [...allTeams] = teams.map((team) => {
      let pathMatches = matches;
      if (path === 'home') pathMatches = matches.filter((match) => match.homeTeamId === team.id);
      if (path === 'away') pathMatches = matches.filter((match) => match.awayTeamId === team.id);
      return {
        name: team.teamName,
        ...getAllInfo(pathMatches, team.id),
      };
    });

    const orderedLeaderboard = LeaderboardService.orderLeaderboard(allTeams);

    return orderedLeaderboard;
  }

  public async getLeaderboard(path: string): Promise<ServiceResponse<ILeaderBoard[]>> {
    const teams = await this.teamModel.findAll();
    const matchesFilter = await this.matchesModel.filteredMatches('false');

    const allTeams = LeaderboardService.getInfo(matchesFilter, teams, path);

    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
