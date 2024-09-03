import _ from "lodash";
import colorConvert from "color-convert";
import { logger } from "../logger";
import { Course } from "../models/course";
import { CourseRolesSetting } from "../models/configuration_models/courseRolesSetting";
import { messageEmbed } from "./messageEmbed";
import type { ColorResolvable, CommandInteraction, Guild, GuildMemberResolvable } from "discord.js";
import { HexColorString } from "discord.js";

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
 * @param {Guild} guild The Discord guild
 * @param {User} user The Discord user in question.
 * @param {Course} course The database entry for the course.
 */
export async function removeUserFromCourseChannel(guild: Guild, user: GuildMemberResolvable, course: Course) {
    const targetUser = guild.members.resolve(user);
    await targetUser?.roles.remove(course.roleId);
}

/**
 * @param {string} name The name of the course and the course role.
 * @param {CommandInteraction} interaction
 */
export async function createCourseChannel(name: string, interaction: CommandInteraction) {
    const guild = interaction.guild;

    if (!guild) {
        throw new Error('Guild not found.');
    }

    const courseRoleSettings = await CourseRolesSetting.findOne({ where: { guildId: guild?.id } });
    if(courseRoleSettings === null) {
        interaction.reply({ embeds: [messageEmbed("Course role settings are not configured.", "RED")]});
    }

    const joinMessageChannel = await guild?.channels.fetch(courseRoleSettings?.roleSelectionChannelId!);
    
    if (!joinMessageChannel?.isText()) {
        throw new Error("Could not send message to join message channel as it is not text based.");
    }

    name = _.upperCase(name);
    name = name.replace(/ /g, "");

    const role = await guild?.roles.create({ name });
    role?.setHoist(true);
    role?.setMentionable(true);


    const courseChannel = await guild?.channels.create(name);
    await courseChannel?.setParent(courseRoleSettings?.courseChatCategoryId!, { lockPermissions: false });
    await courseChannel?.permissionOverwrites.edit(role!, {
        VIEW_CHANNEL: true
    });

    await courseChannel?.permissionOverwrites.edit(guild?.roles.everyone!, {
        VIEW_CHANNEL: false
    });

    const joinMessage = await joinMessageChannel?.send(`**${name}** <@&${role?.id}>`);
    // **CS487** @CS487
    await joinMessage.react('👍');

    // Create the database entry
    await Course.create({
        name: name,
        channelId: courseChannel?.id!,
        roleId: role?.id!,
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
 * @param {CommandInteraction} interaction
 */
export async function deleteCourseChannel(roleId: string, interaction: CommandInteraction) {
    const guild = interaction.guild;
    const course = await Course.findOne({
        where: { roleId: roleId }
    });

    if (!course) {
        //throw new Error("No course found for the given role.");
        return interaction.reply({ embeds: [messageEmbed("No course found for the given role.", "RED")]});
    }

    const courseRoleSetting = await CourseRolesSetting.findOne({
        where: { guildId: guild?.id }
    });

    if(!courseRoleSetting) {
        //throw new Error("Join channel is misconfigured.");
        return interaction.reply({ embeds: [messageEmbed("Join channel is misconfigured.", "RED")]});
    }

    const joinChannelId = courseRoleSetting.roleSelectionChannelId;
    const joinChannel = await guild?.channels.fetch(joinChannelId);

    if (!joinChannel?.isText()) {
        throw new Error("Could not send message to join channel as channel is not text-based.");
    }

    const messageId = course.messageId;
    const joinMessage = await joinChannel.messages.fetch(messageId);
    await joinMessage.delete();

    const channelId = course.channelId;
    const channel = await guild?.channels.fetch(channelId);
    await channel?.delete();

    const role = await guild?.roles.fetch(roleId);
    await role?.delete();

    await course.destroy();
}

export async function unlinkExistingCourseChannel(roleId: string, interaction: CommandInteraction) {
    const course = await Course.findOne({
        where: { roleId: roleId }
    });

    if (!course) {
        //throw new Error("No course found for the given role.");
        return interaction.reply({ embeds: [messageEmbed("No course found for the given role.", "RED")]});
    }

    await course.destroy();
}

/**
 * Updates the colors of the course roles in the server
 */
export function updateCourseColors(guild: Guild) {
    return new Promise((resolve, reject) => {
        Course.findAll().then(courses => {
            const courseNames = courses.map(course => course.name);
            const courseColors = getCourseColors(courseNames);
    
            const roleUpdates = courses.map(course => {
                const role = guild.roles.resolve(course.roleId);
                if (!role) {
                    reject(`Role with ID ${course.roleId} not found in guild`);
                }
                const color = courseColors[course.name];
                if (!color) {
                    reject(`No color found for course ${course.name}`);
                }
                return role?.setColor(color);
            });
        
            Promise.all(roleUpdates)
                .then(() => {
                    resolve(`Course colors updated successfully`);
                })
                .catch(err => {
                    reject(err);
                });
        }).catch(err => {
            reject(`Error fetching courses: ${err}`);
        });
    });
}

function getCourseColors(courses: string[]) {
    const sortedClassNames = courses.sort();

    // define the start and end colors of the gradient
    const startHue = 0; // red
    const endHue = 300; // purple
    const saturation = 100;
    const lightness = 50;

    // compute the color gradient
    const colorMap: Record<string, ColorResolvable> = {};

    sortedClassNames.forEach((className, index, coll) => {
        const hue = startHue + (endHue - startHue) * index / (coll.length - 1);
        const hsl: [number, number, number] = [hue, saturation, lightness];
        colorMap[className] = colorConvert.hsl.hex(hsl) as HexColorString;
    })

    return colorMap;
}