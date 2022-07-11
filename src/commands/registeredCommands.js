/**
 * All currently registered commands should be listed below.
 */

import createCourse from "./createCourse.js";
import linkCourse from "./linkCourse.js";
import setCourseRoleChannel from "./setCourseRoleChannel.js";
import deleteCourse from "./deleteCourse.js";

export default [
    createCourse,
    setCourseRoleChannel,
    linkCourse,
    deleteCourse
];