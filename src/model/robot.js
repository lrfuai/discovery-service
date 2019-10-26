const io = require('../comunication/socket-service').io();

const CHANNELLS = {
    CONNECTED : 'robots-conectados',
}

const robots = [];

io.on('connection', function (socket) { // WebSocket Connection
    socket.emit(CHANNELLS.CONNECTED, JSON.stringify(robots));
 
    socket.on('disconnect', function() {
        socket.emit(CHANNELLS.CONNECTED, JSON.stringify(robots));
    });
});

module.exports = {
    CHANNELLS,
    robots
}