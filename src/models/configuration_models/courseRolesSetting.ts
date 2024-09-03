import { DataTypes, InferAttributes, InferCreationAttributes, Model, type Sequelize } from 'sequelize';

class CourseRolesSetting extends Model<InferAttributes<CourseRolesSetting>, InferCreationAttributes<CourseRolesSetting>> {
    declare guildId: string;
    declare roleSelectionChannelId: string;
    declare courseChatCategoryId: string;
}

const CourseRolesSettingModelInit = (sequelize: Sequelize) => {
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