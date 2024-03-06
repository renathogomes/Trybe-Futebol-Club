import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IUser } from '../../Interfaces/users/IUser';

export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model<IUser>>('users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });
    },
    down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('users');
    },
};