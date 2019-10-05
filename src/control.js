const logger = require('./logger');
const socketService = require('./services/socket.service');

const { engine, sockets} = socketService.io;

const CHANNELLS = {
    BUTTON_CLICK = 'button_click'
}

sockets.on('connection', function (socket) { // WebSocket Connection

  

});


module.exports = {
  CHANNELLS,
}