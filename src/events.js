const {EventEmitter} = require('events');

const Emitter = new EventEmitter();

const Events = {
    WELLCOME: 'wellcome',
    
    USER_JOINED : 'ar.lrf.user.joined',
    USER_LEFT : 'ar.lrf.user.left',
    
    ROBOT_JOINED: 'ar.lrf.robot.joined',
    ROBOT_LEFT: 'ar.lrf.robot.left',
    
    TEAM_CREATED: 'ar.lrf.team.created',
    TEAM_USER_JOINED: 'ar.lrf.team.user_joined',
    TEAM_USER_LEFT: 'ar.lrf.team.user_left',
    TEAM_DELETED: 'ar.lrf.team.deleted',
    
}

module.exports = {
    Events,
    on: (event, listener) => Emitter.on(event, listener),
    emit: (event, payload) => {
        payload.event = event;
        Emitter.emit(event,payload);
    },
};



