/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import { logger } from '../logger.js';
import { CourseModelInit } from './course.js';
import { ThreadOfTheDayChannelSettingInit } from './configuration_models/threadOfTheDayChannelSetting.js';
import { CourseRolesSettingModelInit } from './configuration_models/courseRolesSetting.js';
import { WelcomeChannelModelInit } from './configuration_models/welcomeChannelSetting.js';

logger.info("Initializing database connection.");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/database.sqlite'
});

CourseModelInit(sequelize);
CourseRolesSettingModelInit(sequelize);
WelcomeChannelModelInit(sequelize);
ThreadOfTheDayChannelSettingInit(sequelize);

export { sequelize };