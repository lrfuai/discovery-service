const io = require('../comunication/socket-service').io();
const { robots } = require('../model/robot');
const { users, sockets } = require('../model/user');

module.exports = ({ Events, on }) => {

  // Every User Joined
  on(Events.USER_JOINED, ({ id, name }) => {

    // Notify all user joined
    io.emit(Events.USER_JOINED, { id, name });
  
    // Send wellcome message to user 
    sockets(id).emit('wellcome', { robots, users });
  });
  
  // Every User Left
  on(Events.USER_LEFT, ({ id, name }) => {

    // Notify All user left
    io.emit(Events.USER_LEFT, { id, name });
  });

};