import { DataTypes, Model } from 'sequelize';

class WelcomeChannel extends Model {}

const WelcomeChannelModelInit = (sequelize) => {
    
    WelcomeChannel.init({
        channelId: DataTypes.STRING,
        guildId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WelcomeChannel'
    });
};

export { WelcomeChannelModelInit, WelcomeChannel };