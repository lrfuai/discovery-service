const config = require('config');
const express = require('express');
const listEndpoints = require('express-list-endpoints');
const package = require('./package');
const logger = require('./src/logger');

// Starting API / WEB / SOCKETS Service
const server = express();
const socketService = require('./src/comunication/socket-service');
const http = socketService.setup(server); // Socket Service
server.use(express.static(__dirname + '/public')); // Public Static Web Service
const webService = require('./src/comunication/web-service');
webService(server); // REST Web Api Service

// Register Event Listeners
const listeners = require('./src/listeners');
listeners();

listEndpoints(server).map(({methods, path}) => logger.info(`Exposed ${path} :: (${methods.join(',')})`));

const PORT = config.get('port');
http.listen(PORT, () => logger.log(`${package.name} v${package.version} listening on port ${PORT}`));

module.exports = http;