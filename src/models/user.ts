import { DataTypes, type InferAttributes, type InferCreationAttributes, Model, type Sequelize, type NonAttribute } from 'sequelize';
import { Guild } from './guild';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare userId: string;
}

const UserModelInit = (sequelize: Sequelize) => {
    User.init({
        userId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User'
    });
};

export { User, UserModelInit };