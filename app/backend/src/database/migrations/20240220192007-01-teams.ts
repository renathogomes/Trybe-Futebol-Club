import { DataTypes, Model, QueryInterface } from 'sequelize';
import { Team } from '../../types/teams';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Team>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
};
