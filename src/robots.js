const logger = require('./logger');
const socketService = require('./services/socket.service');

const {engine,sockets} = socketService.io;

const CHANNELLS = {
    CONNECTED : 'robots-conectados',
}

const robots = [];

io.sockets.on('connection', function (socket) { // WebSocket Connection
    socket.emit(CHANNELLS.CONNECTED, JSON.stringify(robots));
    logger.info(`robots conectados: ${robots.length}`);
 
    socket.on('disconnect', function() {
        socket.emit(CHANNELLS.CONNECTED, JSON.stringify(robots));
        logger.info(`robots conectados: ${robots.length}`);
    });
});

module.exports = {
    CHANNELLS,
    users
}