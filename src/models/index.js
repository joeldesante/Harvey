/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import { logger } from '../logger.js';
import { CourseModelInit } from './course.js';
import { CourseRolesSettingModelInit } from './courseRolesSetting.js';
import { WelcomeChannelModelInit } from './welcomeChannel.js';

logger.info("Initializing database connection.");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/database.sqlite'
});

CourseModelInit(sequelize);
CourseRolesSettingModelInit(sequelize);
WelcomeChannelModelInit(sequelize);

export { sequelize };