const express = require('express');
const socket = require('./src/services/socket');

const server = express();
socket.setup(server);

module.exports = {
    server
}
