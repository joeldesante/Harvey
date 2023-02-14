import { DataTypes, Model } from 'sequelize';

class CourseRolesSetting extends Model {}

const CourseRolesSettingModelInit = (sequelize) => {
    CourseRolesSetting.init({
        guildId: {
            type: DataTypes.STRING,
            unique: true
        },
        roleSelectionChannelId: DataTypes.STRING,
        courseChatCategoryId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'CourseRolesSetting'
    });
};

export { CourseRolesSetting, CourseRolesSettingModelInit };