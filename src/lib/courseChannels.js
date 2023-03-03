import { logger } from "../logger.js";
import _ from "lodash";
import { Course } from "../models/course.js";
import { CourseRolesSetting } from "../models/configuration_models/courseRolesSetting.js";

//import {inspect} from "util";

/**
 * @param {Client} client The Discord bots client.
 * @param {User} user The Discord user in question.
 * @param {Course} course The database entry for the course.
 */
export async function addUserToCourseChannel(guild, user, course) {
    const targetUser = guild.members.resolve(user);
    await targetUser.roles.add(course.roleId);
}

/**
 * @param {Client} client The Discord bots client.
 * @param {User} user The Discord user in question.
 * @param {Course} course The database entry for the course.
 */
export async function removeUserFromCourseChannel(guild, user, course) {
    const targetUser = guild.members.resolve(user);
    await targetUser.roles.remove(course.roleId);
}

/**
 * @param {Client} client The Discord bots client.
 * @param {string} name The name of the course and the course role.
 * @param {Guild} guild The guild in which the channel is being created for.
 */
export async function createCourseChannel(name, guild) {

    const courseRoleSettings = await CourseRolesSetting.findOne({ where: { guildId: guild.id } });
    if(courseRoleSettings === null) {
        throw new Error("Course role settings are not configured.");
    }

    const joinMessageChannel = await guild.channels.fetch(courseRoleSettings.roleSelectionChannelId);
    
    // FIXME: This is throwing an error! Why? I really don't know... isTextBased is in fact a documented function and yet it doesn't want to work.
    /*if(joinMessageChannel.isTextBased() === false) {
        throw new Error("Could not send message to join message channel as it is not text based.");
    }*/

    name = _.upperCase(name);
    name = name.replace(/ /g, "");

    const role = await guild.roles.create({ name });
    role.setHoist(true);
    role.setMentionable(true);


    const courseChannel = await guild.channels.create(name);
    await courseChannel.setParent(courseRoleSettings.courseChatCategoryId, { lockPermissions: false });
    await courseChannel.permissionOverwrites.edit(role, {
        VIEW_CHANNEL: true
    });

    await courseChannel.permissionOverwrites.edit(guild.roles.everyone, {
        VIEW_CHANNEL: false
    });

    const joinMessage = await joinMessageChannel.send(`**${name}** <@&${role.id}>`);
    // **CS487** @CS487
    await joinMessage.react('👍');

    // Create the database entry
    await Course.create({
        name: name,
        channelId: courseChannel.id,
        roleId: role.id,
        messageId: joinMessage.id
    });

    // update the colors of the course channels
    updateCourseColors(guild);
}

/**
 * Adds an existing course channel to the database.
 * @param {String} channelId 
 * @param {String} joinMessageId 
 * @param {String} roleId 
 */
export async function linkExistingCourseChannel(channelId, joinMessageId, roleId, name) {
    await Course.create({
        name: name,
        channelId: channelId,
        roleId: roleId,
        messageId: joinMessageId
    });
}

/**
 * Deletes the course channel and related roles.
 * @param {String} roleId 
 */
export async function deleteCourseChannel(roleId, guild) {
    const course = await Course.findOne({
        where: { roleId: roleId }
    });

    if (!course) {
        throw new Error("No course found for the given role.");
    }

    const courseRoleSetting = await CourseRolesSetting.findOne({
        where: { guildId: guild.id }
    });

    if(!courseRoleSetting) {
        throw new Error("Join channel is misconfigured.");
    }

    const joinChannelId = courseRoleSetting.roleSelectionChannelId;
    const joinChannel = await guild.channels.fetch(joinChannelId);

    const messageId = course.messageId;
    const joinMessage = await joinChannel.messages.fetch(messageId);
    await joinMessage.delete();

    const channelId = course.channelId;
    const channel = await guild.channels.fetch(channelId);
    await channel.delete();

    const role = await guild.roles.fetch(roleId);
    await role.delete();

    await course.destroy();
}

export async function unlinkExistingCourseChannel(roleId, guild) {
    const course = await Course.findOne({
        where: { roleId: roleId }
    });

    if (!course) {
        throw new Error("No course found for the given role.");
    }

    await course.destroy();
}

/**
 * Updates the colors of the course roles in the server
 */
function updateCourseColors(guild) {
    Course.findAll().then(courses => {
        const courseNames = courses.map(course => course.name);
        const courseColors = getCourseColors(courseNames);

        courses.forEach(course => {
            const role = guild.roles.resolve(course.roleId);
            role.setColor(courseColors[course.name]);
        });
    });
}

/**
 * Extracts the first number from a string.
 * @param {String} courseName
 */
function getCourseColors(courses) {
    // sort the list alphabetically
    const sortedClassNames = courses.sort();

    // define the start and end colors of the gradient
    const startColor = [255, 0, 0]; // red
    const endColor = [128, 0, 128]; // purple

    // compute the color gradient
    const numClasses = sortedClassNames.length;
    const colors = [];
    for (let i = 0; i < numClasses; i++) {
    // compute the color for this class
        const r = startColor[0] + (endColor[0] - startColor[0]) * i / (numClasses - 1);
        const g = startColor[1] + (endColor[1] - startColor[1]) * i / (numClasses - 1);
        const b = startColor[2] + (endColor[2] - startColor[2]) * i / (numClasses - 1);
        const color = '#' + rgbToHex(r, g, b);
        colors.push(color);
    }

    // map the sorted class names to their corresponding colors
    const colorMap = Object.fromEntries(sortedClassNames.map((name, i) => [name, colors[i]]));

    console.log(colorMap);

    // utility function to convert RGB values to hex string
    function rgbToHex(r, g, b) {
        const componentToHex = (c) => {
            const hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return componentToHex(Math.round(r)) + componentToHex(Math.round(g)) + componentToHex(Math.round(b));
    }
}