/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import { logger } from '../logger';
import { CourseModelInit } from './course';
import { ThreadOfTheDayChannelSettingInit } from './configuration_models/threadOfTheDayChannelSetting';
import { CourseRolesSettingModelInit } from './configuration_models/courseRolesSetting';
import { WelcomeChannelModelInit } from './configuration_models/welcomeChannelSetting';
import { NetworkModelInit } from './network';
import { GuildModelInit } from './guild';
import { UserModelInit } from './user';

logger.info("Initializing database connection.");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/database.sqlite'
});

CourseModelInit(sequelize);
CourseRolesSettingModelInit(sequelize);
WelcomeChannelModelInit(sequelize);
ThreadOfTheDayChannelSettingInit(sequelize);
UserModelInit(sequelize);
GuildModelInit(sequelize);
NetworkModelInit(sequelize);

export { sequelize };