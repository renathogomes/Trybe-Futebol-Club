import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreateOptions,
} from 'sequelize';
import db from '.';

class SequelizeTeam extends Model<
InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>
> {
  declare id: CreateOptions<number>;
  declare teamName: string;
}

SequelizeTeam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'team',
    timestamps: false,

    underscored: true,
  },
);

export default SequelizeTeam;
