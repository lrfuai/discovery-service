const logger = require('../logger');

module.exports = ({Events,on}) => {

    on(Events.USER_JOINED, payload => {
        logger.info( payload.event, payload)
    });
    on(Events.USER_LEFT, payload => {
        logger.info( payload.event, payload)
    });
    
    on(Events.ROBOT_JOINED, payload => {
        logger.info( payload.event, payload)
    });
    on(Events.ROBOT_LEFT, payload => {
        logger.info( payload.event, payload)
    });

    on(Events.TEAM_CREATED, payload => {
        logger.info( payload.event, payload)
    });
    on(Events.TEAM_USER_JOINED, payload => {
        logger.info( payload.event, payload)
    });
    on(Events.TEAM_USER_LEFT, payload => {
        logger.info( payload.event, payload)
    });
    on(Events.TEAM_DELETED, payload => {
        logger.info( payload.event, payload)
    });
};