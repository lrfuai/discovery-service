const http = require('http');
let io;

const setup = (server) => {
    http.createServer(server) //require http server, and create server with function handler()
    io = require('socket.io')(http) //require socket.io module and pass the http object (server)
};

module.exports = {
    setup,
    io: () => {
        if(!io) { throw 'Sockets not available' }
        return io;
    }
}