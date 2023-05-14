import { Network } from '../models/network';
import { Guild } from '../models/guild';

/**
 * @param {string} name The name of the network.
 */
export async function createNetwork(name: string) {
    await Network.create({
        name: name
    });    
}

/**
 * @param {string} name The name of the network.
 * @param {string} guildId The id of the guild.
 */
 export async function joinNetwork(name: string, guildId: string | null) {

    console.log(1)
    if(guildId === null) {
        throw new Error("Invalid guild id.");
    }
    console.log(2)

    const network = await Network.findOne({
        where: {
            name: name
        }
    });

    console.log(3)

    if(!network) {
        throw new Error("Network not found");
    }

    console.log(4)
    const guild = await Guild.findOne({
        where: {
            guildId: guildId
        }
    })

    console.log(5)
    if(!guild) {
        throw new Error("Guild not found")
    }

    console.log(6)
    network.addGuild(guild);
    console.log(7)
}