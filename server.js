const config = require('config');
const express = require('express');
const listEndpoints = require('express-list-endpoints');
const package = require('./package');
const logger = require('./src/logger');

// Starting API / WEB / SOCKETS Service
const server = express();

// REST Web Api Service
const webService = require('./src/comunication/web-service');
webService(server);

// Public Static Web Service
server.use(express.static(__dirname + '/public'));

// Socket Service
const socketService = require('./src/comunication/socket-service');
const http = socketService.setup(server);

// Register Event Listeners
const listeners = require('./src/listeners');
listeners();

listEndpoints(server).map(({methods, path}) => logger.info(`Exposed ${path} :: (${methods.join(',')})`));

const PORT = config.get('port');
http.listen(PORT, () => logger.log(`${package.name} v${package.version} listening on port ${PORT}`));

module.exports = http;