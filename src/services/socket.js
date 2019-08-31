const logger = require('../logger');

let io;

const setup = (server) => {
    const http = require('http').createServer(server) //require http server, and create server with function handler()
    io = require('socket.io')(http) //require socket.io module and pass the http object (server)
};

const sockets = () => {
    if(!io) {
        throw 'Sockets not available';
    }
    return io.sockets;
}

module.exports = {
    setup,
    sockets
}