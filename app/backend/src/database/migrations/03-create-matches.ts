import { Model, DataTypes, QueryInterface } from 'sequelize';
import { MatchDefault } from '../../Interfaces/match/MatchType';

export default {
    up(queryInterface: QueryInterface, Sequelize: any) {
        return queryInterface.createTable('matches', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            homeTeamId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'home_team_id',
            },
            homeTeamGoals: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'home_team_goals',
            },
            awayTeamId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'away_team_id',
            },
            awayTeamGoals: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'away_team_goals',
            },
            inProgress: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                field: 'in_progress',
            },
        });
    },
    down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('matches');
    }
}