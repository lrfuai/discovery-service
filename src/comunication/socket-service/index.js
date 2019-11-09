const http = require('http');
const socketIO = require('socket.io');

let io;

const setup = (server) => {
    httpServer = http.createServer(server) //require http server, and create server with function handler()
    io = socketIO(httpServer) //require socket.io module and pass the http object (server)
    return httpServer;
};

module.exports = {
    setup,
    io: () => {
        if(!io) { throw 'Sockets not available' }
        return io;
    }
}