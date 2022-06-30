/* eslint-disable camelcase */
import { Sequelize, DataTypes } from 'sequelize';
import { logger } from '../logger';

logger.info("Initializing database connection.");
const sequelize = new Sequelize('sqlite::memory:');

logger.info("Registering database models.")
const Course = sequelize.define('Course', {
    course_number: DataTypes.STRING,
    subject: DataTypes.STRING,
    title: DataTypes.STRING,
    subscriber_count: DataTypes.INTEGER,
    channel_id: DataTypes.STRING,
    message_id: DataTypes.STRING
});

export { Course };