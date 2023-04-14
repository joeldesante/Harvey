import { DataTypes, InferAttributes, InferCreationAttributes, Model, type Sequelize } from 'sequelize';

class ThreadOfTheDayChannelSetting extends Model<
    InferAttributes<ThreadOfTheDayChannelSetting>,
    InferCreationAttributes<ThreadOfTheDayChannelSetting>
> {
    declare guildId: string;
    declare channelId: string;
}

const ThreadOfTheDayChannelSettingInit = (sequelize: Sequelize) => {
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