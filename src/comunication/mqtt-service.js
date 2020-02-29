const config = require('config');
const mqtt = require('mqtt');
const logger = require('../logger');

const ENDPOINT = `mqtt://${config.get("mqtt.endpoint")}`;

const client = mqtt.connect(ENDPOINT);

client.on('connect', function() {
    logger.info("client is connected ok! ", {ENDPOINT});
});

module.export = client;