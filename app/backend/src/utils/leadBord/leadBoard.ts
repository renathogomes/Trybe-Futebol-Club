import Match from './match';
import Team from './team';
import { ILeaderBoard } from '../../Interfaces/leaderBoard/ILeaderBoard';
import ILeaderBoardType from '../../Interfaces/leaderBoard/ILeaderBoardType';

export default class LeaderBoard {
  private maches: Match[];
  private teams: Team[];

  constructor(maches: Match[], teams: Team[]) {
    this.maches = maches.filter((match) => match.inProgress === false);
    this.teams = teams;
  }

  private totalVictories = (team: Team, type: ILeaderBoardType): number => {
    switch (type) {
      case 'home':
        return this.maches.filter((match) => match
          .homeTeam === team.name && match.homeTeamGoals > match.awayTeamGoals).length;
      case 'away':
        return this.maches.filter((match) => match
          .awayTeam === team.name && match.homeTeamGoals < match.awayTeamGoals).length;
      default:
        return this.maches.filter(
          (match) =>
            (match.homeTeam === team.name && match.homeTeamGoals > match.awayTeamGoals)
               || (match.awayTeam === team.name && match.awayTeamGoals > match.homeTeamGoals),
        ).length;
    }
  };

  private totalDraws = (team: Team, type: ILeaderBoardType): number => {
    switch (type) {
      case 'home':
        return this.maches.filter((match) => match
          .homeTeam === team.name && match.homeTeamGoals === match.awayTeamGoals).length;
      case 'away':
        return this.maches.filter((match) => match
          .awayTeam === team.name && match.homeTeamGoals === match.awayTeamGoals).length;
      default:
        return this.maches.filter(
          (match) =>
            (match.homeTeam === team.name && match.homeTeamGoals === match.awayTeamGoals)
               || (match.awayTeam === team.name && match.awayTeamGoals === match.homeTeamGoals),
        ).length;
    }
  };

  private totalLosses = (team: Team, type: ILeaderBoardType): number => {
    switch (type) {
      case 'home':
        return this.maches.filter((match) => match
          .homeTeam === team.name && match.homeTeamGoals < match.awayTeamGoals).length;
      case 'away':
        return this.maches.filter((match) => match
          .awayTeam === team.name && match.homeTeamGoals > match.awayTeamGoals).length;
      default:
        return this.maches.filter(
          (match) =>
            (match.homeTeam === team.name && match.homeTeamGoals < match.awayTeamGoals)
                 || (match.awayTeam === team.name && match.awayTeamGoals < match.homeTeamGoals),
        ).length;
    }
  };

  private goalsFavor = (team: Team, type: ILeaderBoardType): number => {
    switch (type) {
      case 'home':
        return this.maches.filter((match) => match.homeTeam === team.name)
          .reduce((acc, match) => acc + match.homeTeamGoals, 0);
      case 'away':
        return this.maches.filter((match) => match.awayTeam === team.name)
          .reduce((acc, match) => acc + match.awayTeamGoals, 0);
      default:
        return this.maches.filter(
          (match) => match.homeTeam === team.name || match.awayTeam === team.name,
        ).reduce((acc, match) => acc + match.homeTeamGoals + match.awayTeamGoals, 0);
    }
  };

  private goalsOwn = (team: Team, type: ILeaderBoardType): number => {
    switch (type) {
      case 'home':
        return this.maches.filter((match) => match.homeTeam === team.name)
          .reduce((acc, match) => acc + match.awayTeamGoals, 0);
      case 'away':
        return this.maches.filter((match) => match.awayTeam === team.name)
          .reduce((acc, match) => acc + match.homeTeamGoals, 0);
      default:
        return this.maches.filter(
          (match) => match.homeTeam === team.name || match.awayTeam === team.name,
        ).reduce((acc, match) => acc + match.homeTeamGoals + match.awayTeamGoals, 0);
    }
  };

  private totalPoints = (team: Team, type: ILeaderBoardType): number => {
    switch (type) {
      case 'home':
        return this.totalVictories(team, type) * 3 + this.totalDraws(team, type);
      case 'away':
        return this.totalVictories(team, type) * 3 + this.totalDraws(team, type);
      default:
        return this.totalVictories(team, type) * 3 + this.totalDraws(team, type);
    }
  };

  private efficiency = (team: Team, type: ILeaderBoardType): string => {
    const totalGames = this.totalVictories(team, type)
    + this.totalDraws(team, type) + this.totalLosses(team, type);
    return `${((this.totalPoints(team, type) / (totalGames * 3)) * 100).toFixed(2)}%`;
  };

  public getLeaderBoard = (type: ILeaderBoardType): ILeaderBoard[] => {
    const leaderBoard: ILeaderBoard[] = [];
    this.teams.forEach((team) => {
      leaderBoard.push({
        name: team.name,
        totalPoints: this.totalPoints(team, type),
        totalGames: this.totalVictories(team, type)
        + this.totalDraws(team, type) + this.totalLosses(team, type),
        totalVictories: this.totalVictories(team, type),
        totalDraws: this.totalDraws(team, type),
        totalLosses: this.totalLosses(team, type),
        goalsFavor: this.goalsFavor(team, type),
        goalsOwn: this.goalsOwn(team, type),
        goalsBalance: this.goalsFavor(team, type) - this.goalsOwn(team, type),
        efficiency: this.efficiency(team, type),
      });
    });
    return leaderBoard;
  };

  public getLeaderBoardSorted = (type: ILeaderBoardType): ILeaderBoard[] => {
    const leaderBoard = this.getLeaderBoard(type);
    return leaderBoard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
  };

  public getLeaderBoardSortedByGoals = (type: ILeaderBoardType): ILeaderBoard[] => {
    const leaderBoard = this.getLeaderBoard(type);
    return leaderBoard.sort((a, b) => b.goalsFavor - a.goalsFavor
        || b.goalsBalance - a.goalsBalance
        || b.totalPoints - a.totalPoints);
  };

  public getLeaderBoardSortedByEfficiency = (type: ILeaderBoardType): ILeaderBoard[] => {
    const leaderBoard = this.getLeaderBoard(type);
    return leaderBoard.sort((a, b) => b.efficiency.localeCompare(a.efficiency));
  };

  public getLeaderBoardSortedByGoalsOwn = (type: ILeaderBoardType): ILeaderBoard[] => {
    const leaderBoard = this.getLeaderBoard(type);
    return leaderBoard.sort((a, b) => b.goalsOwn - a.goalsOwn
        || b.goalsBalance - a.goalsBalance
        || b.totalPoints - a.totalPoints);
  };
}
