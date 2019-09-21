const express = require('express');
const listEndpoints = require('express-list-endpoints');
const package = require('./package');
const logger = require('./src/logger');
const socketService = require('./src/services/socket.service');
const routes = require('./src/ws/routes');
const server = express();

const PORT = 8080;

server.use(express.static(__dirname + '/public'));

server.use('/', routes);

listEndpoints(server).map(({methods, path}) => logger.info(`Exposed ${path} :: (${methods.join(',')})`));


const http = socketService.setup(server);



http.listen(PORT, () => logger.log(`${package.name} v${package.version} listening on port ${PORT}`));

module.exports = http;