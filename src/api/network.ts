import express from 'express';

let network = express.Router();

/**
 * Returns all the networks which a given user has authority over
 */
network.get('/', (req, res) => {
    res.json("networks");
})

/**
 * Creates a new network
 */
network.post('/', (req, res) => {
    res.json("networks");
})

/**
 * Returns a network given an identifier
 */
network.get('/:id', (req, res) => {
    res.json("networks");
})

/**
 * Deletes a network given an identifier
 */
network.delete('/:id', (req, res) => {
    res.json("networks");
})

/**
 * Updates a network given the identifier
 */
network.put('/:id', (req, res) => {
    res.json("networks");
})

/**
 * Gets the currently register guilds for this network
 */
network.get('/:id/guilds', (req, res) => {
    res.json("networks");
})

/**
 * Registers a guild to this network given identifiers
 */
network.post('/:id/guilds', (req, res) => {
    res.json("networks");
})

/**
 * Removes a guild from a given network given identifiers
 */
network.delete('/:id/guilds/:id', (req, res) => {
    res.json("networks");
})

export default network;