import { DataTypes, type InferAttributes, type InferCreationAttributes, Model, type Sequelize } from 'sequelize';

class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
    declare name: string;
    declare channelId: string;
    declare messageId: string;
    declare roleId: string;
}

const CourseModelInit = (sequelize: Sequelize) => {
    Course.init({
        name: DataTypes.STRING,
        channelId: DataTypes.STRING,
        messageId: DataTypes.STRING,
        roleId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Course'
    });
};

export { Course, CourseModelInit };