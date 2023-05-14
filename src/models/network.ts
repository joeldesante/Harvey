import { 
    DataTypes, 
    Model,
    type InferAttributes, 
    type InferCreationAttributes, 
    type Sequelize, 
    type NonAttribute,
    type HasManyAddAssociationMixin
} from 'sequelize';
import { Guild } from './guild';

class Network extends Model<InferAttributes<Network>, InferCreationAttributes<Network>> {
    declare name: string;
    declare guilds?: NonAttribute<Guild[]>
    declare addGuild: HasManyAddAssociationMixin<Guild, number>;
}

const NetworkModelInit = (sequelize: Sequelize) => {
    Network.init({
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Network'
    });

    Network.hasMany(Guild);
    Guild.hasOne(Network);
};

export { Network, NetworkModelInit };