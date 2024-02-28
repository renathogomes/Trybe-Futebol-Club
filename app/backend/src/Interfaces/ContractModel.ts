import { ITeam } from './ITeam';

export interface ITeamCreate {
  create(data: Partial<ITeam>): Promise<ITeam>;
}
