import { logger } from "../logger.js";
import _ from "lodash";
import { Course } from "../models/course.js";
import { CourseRolesSetting } from "../models/courseRolesSetting.js";

import {inspect} from "util";

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

    name = _.camelCase(name);

    const role = await guild.roles.create({ name });

    const courseChannel = await guild.channels.create(name);
    courseChannel.permissionOverwrites.edit(guild.roles.everyone, {
        VIEW_CHANNEL: false
    });

    courseChannel.permissionOverwrites.edit(role, {
        VIEW_CHANNEL: true
    });

    const joinMessage = await joinMessageChannel.send(`**${_.upperCase(name)} @${name}**`);
    await joinMessage.react('👍');

    // Create the database entry
    await Course.create({
        name: name,
        channelId: courseChannel.id,
        roleId: role.id,
        messageId: joinMessage.id
    });
}