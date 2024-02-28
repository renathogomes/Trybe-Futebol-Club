import SequelizeTeam from '../database/models/SequelizeTeam';
import { Iteam } from '../Interfaces/teams/ITeam';
import { ITeamCreate } from '../Interfaces/ContractModel';

export default class TeamModel implements ITeamCreate {
  private model = SequelizeTeam;

  // incialmenente quer listar os times

  async findAll(): Promise<Iteam[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
