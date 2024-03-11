import Team from './team';

export default class Match {
  private _match: {
    homeTeam: Team;
    awayTeam: Team;
    homeTeamGoals: number;
    awayTeamGoals: number;
    inProgress: boolean;
  };

  constructor(
    match: {
      homeTeam: Team;
      awayTeam: Team;
      homeTeamGoals: number;
      awayTeamGoals: number;
      inProgress: boolean;
    },
  ) {
    this._match = match;
  }

  get homeTeam(): string {
    return this._match.homeTeam.name;
  }

  get awayTeam(): string {
    return this._match.awayTeam.name;
  }

  get homeTeamGoals(): number {
    return this._match.homeTeamGoals;
  }

  get awayTeamGoals(): number {
    return this._match.awayTeamGoals;
  }

  get inProgress(): boolean {
    return this._match.inProgress;
  }
}
