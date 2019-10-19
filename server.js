const config = require('config');
const express = require('express');
const listEndpoints = require('express-list-endpoints');
const logger = require('./src/logger');
const package = require('./package');
const listeners = require('./src/listeners');
const socketService = require('./src/services/socket.service');
const server = express();

const PORT = config.get('port');

const http = socketService.setup(server);
server.use(express.static(__dirname + '/public'));
server.use('/', require('./src/ws/routes'));

listeners();

listEndpoints(server).map(({methods, path}) => logger.info(`Exposed ${path} :: (${methods.join(',')})`));

http.listen(PORT, () => logger.log(`${package.name} v${package.version} listening on port ${PORT}`));

module.exports = http;