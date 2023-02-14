import { DataTypes, Model } from 'sequelize';

class ThreadOfTheDayChannelSetting extends Model {}

const ThreadOfTheDayChannelSettingInit = (sequelize) => {
    ThreadOfTheDayChannelSetting.init({
        guildId: {
            type: DataTypes.STRING,
            unique: true
        },
        channelId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ThreadOfTheDayChannelSetting'
    });
};

export { ThreadOfTheDayChannelSetting, ThreadOfTheDayChannelSettingInit };