import { Sequelize, Model, DataTypes } from 'sequelize';
import { Logger } from '../logger';

Logger.info("Initializing database connection.");
const sequelize = new Sequelize('sqlite::memory:');

Logger.info("Registering database models.")
const Course = sequelize.define('Course', {
  course_number: DataTypes.STRING,
  subject: DataTypes.STRING,
  title: DataTypes.STRING,
  subscriber_count: DataTypes.INTEGER,
  channel_id: DataTypes.STRING,
  message_id: DataTypes.STRING
});

export { Course };