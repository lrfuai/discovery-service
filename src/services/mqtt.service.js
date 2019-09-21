const config = require('../../config');
const logger = require('../logger');
const mqtt = require('mqtt');

const ENDPOINT = `mqtt://${config.mqtt.endpoint}`;

const client = mqtt.connect(ENDPOINT);

client.on('connect', function() {
    logger.info("client is connected ok! ", {ENDPOINT});
});

module.export = client;