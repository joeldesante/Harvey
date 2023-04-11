/**
 * All currently registered commands should be listed below.
 */

import createCourse from "./createCourse";
import linkCourse from "./linkCourse";
import unlinkCourse from "./unlinkCourse";
import setCourseRoleChannel from "./setCourseRoleChannel";
import deleteCourse from "./deleteCourse";
import setWelcomeChannel from "./setWelcomeChannel";
import setThreadOfTheDayChannel from "./setThreadOfTheDayChannel";
import updateCourses from "./updateCourses";

export default [
    createCourse,
    setCourseRoleChannel,
    linkCourse,
    deleteCourse,
    unlinkCourse,
    setWelcomeChannel,
    setThreadOfTheDayChannel,
    updateCourses,
];