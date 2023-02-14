import * as fs from "fs";
import * as csv from 'csv/sync';
import { logger } from "../logger";
import path from "path";


/**
 * For internal use only!
 * Loads the CSV which contains the topics of the day.
 * @param {String} path Location of the topics file.
 */
async function loadCSVTopicsData(path) {
    let data = "";
    try {
        data = fs.readFileSync(path, 'utf8');
        logger.info(`Loaded topics data file at ${path}.`)
    } catch(e) {
        logger.error(`Failed to load the topics data. ${e}`)
        return null;
    }

    const records = csv.parse(data, {
        delimiter: '~'
    })
    return records;
}

/**
 * Gets the next thread topic from the list.
 * Will loop back to the first one after all others are exhausted.
 */
export async function getRandomThreadTopic() {
    logger.debug(`Topics data path: ${path.join(process.cwd(), "/data/topics.csv")}`);
    const topics = await loadCSVTopicsData(path.join(process.cwd(), "/data/topics.csv"));
    const randomIndex = Math.floor(Math.random() * (topics.length - 1));

    logger.debug(`Random Topic: ${topics[randomIndex]}`)
    return topics[randomIndex];
}