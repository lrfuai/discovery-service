const events = require('../events');

module.exports = () => {
    const listeners = [
        require('./event-logger'),
        
    ];
    
    listeners.map(listener => listener(events));
}