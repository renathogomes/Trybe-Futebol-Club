import { IMatch } from './IMatch';
import { MatchDefault } from './MatchType';

export interface IMatchModel {
  createMatch(match: MatchDefault): Promise<IMatch>;
  getAll(): Promise<IMatch[]>;
  filteredMatches(query: string): Promise<IMatch[]>;
  updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void>;
  endMatch(id: number): Promise<void>;
}
