const socketService = require('./socket.service');
const funnyName = require('./funny-name.service');
const {Events,emit} = require('../events');
const io = socketService.io();

let users = [];

io.on('connection', socket => {
  const user = { id: socket.id, alias: funnyName.get(), socket};
  users.push(user);
  emit(Events.USER_JOINED, user);

  socket.on('disconect',() => {
    users = users.filter(aUser => aUser.id !== user.id);
    emit(Events.USER_LEFT, user);
  })
});

const getById = id => {
  const filtered = users.filter(user => user.id === id);
  if(filtered.length !== 1) {
    return filtered;
  }
  throw new Error(`Unable to find user '${id}' in ${users.map(user => user.id).join(',')}`);
}

module.exports = {
  users,
  getById
};