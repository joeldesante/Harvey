/**
 * All currently registered commands should be listed below.
 */

import createCourse from "./createCourse.js";
import linkCourse from "./linkCourse.js";
import unlinkCourse from "./unlinkCourse.js";
import setCourseRoleChannel from "./setCourseRoleChannel.js";
import deleteCourse from "./deleteCourse.js";
import setWelcomeChannel from "./setWelcomeChannel.js";
import setThreadOfTheDayChannel from "./setThreadOfTheDayChannel.js";

export default [
    createCourse,
    setCourseRoleChannel,
    linkCourse,
    deleteCourse,
    unlinkCourse,
    setWelcomeChannel,
    setThreadOfTheDayChannel
];