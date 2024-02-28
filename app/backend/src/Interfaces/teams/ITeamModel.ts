import { ContractModelRead } from '../ContractModel';
import { ITeam } from './ITeam';

export interface ITeamModel extends ContractModelRead<ITeam> {
  findAll(): Promise<ITeam[]>;

}
