const events = require('../events');

module.exports = () => {
    const event_logger_listener = require('./event-logger');
    const user_sync_listener = require('./user-sync');
    const robot_sync_listener = require('./robot-sync');
    
    // Enabled Listeners
    const listeners = [
        event_logger_listener,
        user_sync_listener,
        robot_sync_listener
    ];
    
    listeners.map(listener => listener(events));
}