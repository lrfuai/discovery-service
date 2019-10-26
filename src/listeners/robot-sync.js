const io = require('../comunication/socket-service').io();
const { robots } = require('../model/robot');

module.exports = ({ Events, on }) => {

  // Every Robot Joined
  on(Events.ROBOT_JOINED, ({ id, name, socket, event }) => {

    // Notify all robot joined
    io.emit(Events.ROBOT_JOINED, { id, name });
  });

  // Every Robot Left
  on(Events.ROBOT_LEFT,  ({ id, name }) => {
    // Notify all robot left
    io.emit(Events.ROBOT_LEFT, { id, name });
  });

};