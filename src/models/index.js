/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import { logger } from '../logger.js';
import { CourseModelInit } from './course.js';
import { CourseRolesSettingModelInit } from './courseRolesSetting.js';

logger.info("Initializing database connection.");
const sequelize = new Sequelize('sqlite::memory:');

CourseModelInit(sequelize);
CourseRolesSettingModelInit(sequelize);

export { sequelize };