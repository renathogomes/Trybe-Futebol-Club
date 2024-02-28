import { ITeam } from './teams/ITeam';

export interface ContractModelCreate {
  create(data: Partial<ITeam>): Promise<ITeam>;
}

export interface ContractModelRead {
  read(): Promise<ITeam[]>;
}
