import express from "express";
import network from "../api/network";
import { logger } from "../logger";
const PORT = 9090;

export function registerAPIHandler() {
    const api = express();
    api.use(express.json())

    api.use('/networks', network);

    api.get('/', (req, res) => {
        res.json('Harvey is alive.')
    });

    api.listen(PORT, () => {
        logger.info(`Harvey API is running on port ${PORT}`);
    });
}