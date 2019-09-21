const logger = require('./logger');
const sockerService = require('./services/socket.service');

const {engine,sockets} = sockerService.io;

const CHANNELLS = {
    CONNECTED : 'usuarios-conectados',
    ADDED: 'usuario_ingresado'
}

const users = [];
/*
sockets.on('connection', socket => {
  const user = {
    id: socket.id,
    alias: 'none'
  };
  socket.broadcast.emit(CHANNELLS.CONNECTED, users);

  /*
    //envia los usuario a lo el actual socket ID
    socket.emit(CHANNELLS.CONNECTED, users); 

    //envia broadcast a todos los usuario menos el actual socket ID
    socket.broadcast.emit(CHANNELLS.CONNECTED, users); 

    // envia a un usuario especifico
    //socket.broadcast.to(socket.id).emit(CHANNELLS.CONNECTED, io.engine.clientsCount);

    logger.info(`(${socket.id}) Usuario conectados, conectados: ${engine.clientsCount}`);
 
    socket.on('disconnect', function() {
        //envia los usuario a lo el actual socket ID
        socket.emit(CHANNELLS.CONNECTED, "Usuarios: "+ io.engine.clientsCount ); 
        //envia broadcast a todos los usuario menos el actual socket ID
        socket.broadcast.emit(CHANNELLS.CONNECTED, "Usuarios: "+ io.engine.clientsCount); 
        logger.info(`(${socket.id}) Usuario desconectado, conectados: ${engine.clientsCount}`);
     });

    socket.on(CHANNELLS.ADDED, function( email, zona, navegador) {
        users.push({ email, zona, navegador });
    });
    
});
*/
const getById = id => {
  const filtered = users.filter(user => user.id === id);
  if(filtered.length !== 1) {
    return filtered;
  }
  throw new Error(`Unable to find user '${id}' in ${users.map(user => user.id).join(',')}`);
}

module.exports = {
  CHANNELLS,
  users,
  getById
};