import { DataTypes, type InferAttributes, type InferCreationAttributes, Model, type Sequelize } from 'sequelize';

class WelcomeChannel extends Model<InferAttributes<WelcomeChannel>, InferCreationAttributes<WelcomeChannel>> {
    declare channelId: string;
    declare guildId: string;
}

const WelcomeChannelModelInit = (sequelize: Sequelize) => {
    
    WelcomeChannel.init({
        channelId: DataTypes.STRING,
        guildId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WelcomeChannel'
    });
};

export { WelcomeChannelModelInit, WelcomeChannel };