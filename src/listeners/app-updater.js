const io = require('../services/socket.service');
const {robots} = require('../services/robot.service');
const {users} = require('../services/user.service');

module.exports = ({Events,on}) => {

    on(Events.USER_JOINED, user => {
        const {id,name,socket} = user;
        io.emit(Events.USER_JOINED,{id,name});
        socket.emit('wellcome', {
            robots,
            users
        });
    });

    on(Events.USER_LEFT, user => {
        const {id,name} = user;
        io.emit(Events.USER_LEFT,{id,name});
    });
    
};