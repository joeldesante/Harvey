import { DataTypes, Model } from 'sequelize';

class Course extends Model {}

const CourseModelInit = (sequelize) => {
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