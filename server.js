const express = require('express');
const listEndpoints = require('express-list-endpoints');
const package = require('./package');
const logger = require('./src/logger');
const socketService = require('./src/services/socket.service');

const PORT = 8080;

const server = express();
server.use(express.static(__dirname + '/public'));
socketService.setup(server);

listEndpoints(server).map(({methods, path}) => logger.log(`Exposed ${path} :: (${methods.join(',')})`));

server.listen(PORT, () => logger.log(`${package.name} v${package.version} listening on port ${PORT}`));

module.exports = server;
