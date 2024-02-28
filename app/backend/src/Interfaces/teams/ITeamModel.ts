import { ContractModelRead } from '../ContractModel';
import { Iteam } from './ITeam';

export interface ITeamModel extends ContractModelRead<Iteam> {
  fincAll(): Promise<Iteam[]>;
  findById(id: number): Promise<Iteam>;

}
