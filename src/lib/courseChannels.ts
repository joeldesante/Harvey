import _ from "lodash";
import { logger } from "../logger";
import { Course } from "../models/course";
import { CourseRolesSetting } from "../models/configuration_models/courseRolesSetting";
import type { Guild, GuildMemberResolvable } from "discord.js";

//import {inspect} from "util";

/**
 * @param {Guild} guild The Discord guild.
 * @param {GuildMemberResolvable} user The Discord user in question.
 * @param {Course} course The database entry for the course.
 */
export async function addUserToCourseChannel(guild: Guild, user: GuildMemberResolvable, course: Course) {
    const targetUser = guild.members.resolve(user);
    await targetUser?.roles.add(course.roleId);
}

/**
 * @param {Client} client The Discord bots client.
 * @param {User} user The Discord user in question.
 * @param {Course} course The database entry for the course.
 */
export async function removeUserFromCourseChannel(guild: Guild, user: GuildMemberResolvable, course: Course) {
    const targetUser = guild.members.resolve(user);
    await targetUser?.roles.remove(course.roleId);
}

/**
 * @param {Client} client The Discord bots client.
 * @param {string} name The name of the course and the course role.
 * @param {Guild} guild The guild in which the channel is being created for.
 */
export async function createCourseChannel(name: string, guild: Guild) {

    const courseRoleSettings = await CourseRolesSetting.findOne({ where: { guildId: guild.id } });
    if(courseRoleSettings === null) {
        throw new Error("Course role settings are not configured.");
    }

    const joinMessageChannel = await guild.channels.fetch(courseRoleSettings.roleSelectionChannelId);
    
    if (!joinMessageChannel?.isText()) {
        throw new Error("Could not send message to join message channel as it is not text based.");
    }

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

    const joinMessage = await joinMessageChannel?.send(`**${name}** <@&${role.id}>`);
    // **CS487** @CS487
    await joinMessage.react('👍');

    // Create the database entry
    await Course.create({
        name: name,
        channelId: courseChannel.id,
        roleId: role.id,
        messageId: joinMessage.id
    });
}

/**
 * Adds an existing course channel to the database.
 * @param {String} channelId 
 * @param {String} joinMessageId 
 * @param {String} roleId
 * @param {String} name
 */
export async function linkExistingCourseChannel(channelId: string, joinMessageId: string, roleId: string, name: string) {
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
 * @param {Guild} guild
 */
export async function deleteCourseChannel(roleId: string, guild: Guild) {
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

    if (!joinChannel?.isText()) {
        throw new Error("Could not send message to join channel as channel is not text-based.");
    }

    const messageId = course.messageId;
    const joinMessage = await joinChannel.messages.fetch(messageId);
    await joinMessage.delete();

    const channelId = course.channelId;
    const channel = await guild.channels.fetch(channelId);
    await channel?.delete();

    const role = await guild.roles.fetch(roleId);
    await role?.delete();

    await course.destroy();
}

export async function unlinkExistingCourseChannel(roleId: string, guild: Guild) {
    const course = await Course.findOne({
        where: { roleId: roleId }
    });

    if (!course) {
        throw new Error("No course found for the given role.");
    }

    await course.destroy();
}