const logger = require('../logger');

const filter_unlogable_attributes = payload => {
    const obj = {...payload};
    if(obj.socket) {
        delete obj.socket
    }

    return obj;
} 

module.exports = ({Events,on}) => {

    on(Events.USER_JOINED, payload => logger.info( payload.event, filter_unlogable_attributes(payload)));
    on(Events.USER_LEFT, payload => logger.info( payload.event, filter_unlogable_attributes(payload)));
    
    on(Events.ROBOT_JOINED, payload => logger.info( payload.event, filter_unlogable_attributes(payload)));
    on(Events.ROBOT_LEFT, payload => logger.info( payload.event, filter_unlogable_attributes(payload)));

    on(Events.TEAM_CREATED, payload => logger.info( payload.event, filter_unlogable_attributes(payload)));
    on(Events.TEAM_USER_JOINED, payload => logger.info( payload.event, filter_unlogable_attributes(payload)));
    on(Events.TEAM_USER_LEFT, payload => logger.info( payload.event, filter_unlogable_attributes(payload)));
    on(Events.TEAM_DELETED, payload => logger.info( payload.event, filter_unlogable_attributes(payload)));

};