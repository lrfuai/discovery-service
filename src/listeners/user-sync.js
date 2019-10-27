const io = require('../comunication/socket-service').io();
const { robots } = require('../model/robot');
const { users, sockets } = require('../model/user');



module.exports = ({ Events, on }) => {

  // Every User Joined
  on(Events.USER_JOINED, ({ id, name, event }) => {

    // Notify all user joined
    io.emit(event, { id, name, event});
  
    // Send wellcome message to user 
    sockets(id).emit(Events.WELLCOME, { robots, users, event: Events.WELLCOME});
  });
  
  // Every User Left
  on(Events.USER_LEFT, ({ id, name, event }) => {

    // Notify All user left
    io.emit(event, { id, name, event });
  });

};