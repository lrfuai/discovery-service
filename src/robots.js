const logger = require('./logger');
const tunnel = require('./services/tunnel');

const {engine,sockets} = tunnel.io;

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