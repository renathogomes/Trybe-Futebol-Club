import { IMatch } from './IMatch';

export interface IMatchModel {
  getAll(): Promise<IMatch[]>;
  filteredMatches(query: string): Promise<IMatch[]>;
  endMatch(id: number): Promise<void>;
  createMatch(homeTeamId: number, awayTeamId: number): Promise<IMatch>;
}
