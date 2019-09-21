const express = require('express');
const package = require('./package');
const logger = require('./src/logger');
const socketService = require('./src/services/socket.service');
const server = express();

const PORT = 8080;

server.use(express.static(__dirname + '/public'));

const http = socketService.setup(server);

http.listen(PORT, () => logger.log(`${package.name} v${package.version} listening on port ${PORT}`));

module.exports = http;