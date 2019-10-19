const io = require('../services/socket.service').io();
const { robots } = require('../services/robot.service');
const { users, sockets } = require('../services/user.service');

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