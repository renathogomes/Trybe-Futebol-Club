import { ContractModelRead } from '../ContractModel';
import { ITeam } from './ITeam';

export interface ITeamModel extends ContractModelRead<ITeam> {
  fincAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam>;

}
