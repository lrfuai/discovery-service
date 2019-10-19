const socket = io(); //load socket.io-client and connect to the host that serves the page

const Events = {

    USER_JOINED : 'ar.lrf.user.joined',
    USER_LEFT : 'ar.lrf.user.left',
    
    ROBOT_JOINED: 'ar.lrf.robot.joined',
    ROBOT_LEFT: 'ar.lrf.robot.left',
    
    TEAM_CREATED: 'ar.lrf.team.created',
    TEAM_USER_JOINED: 'ar.lrf.team.user_joined',
    TEAM_USER_LEFT: 'ar.lrf.team.user_left',
    TEAM_DELETED: 'ar.lrf.team.deleted',
    
}

function log (message, object ={}) => {
    document.getElementById('interface').innerHTML += `<div><b>${message}</b><pre>${JSON.stringify(object)}</pre></div>`;
    console.info(message,object);
}

socket.on(Events.USER_JOINED, (payload) => log(payload.event, payload));
socket.on(Events.USER_LEFT, (payload) => log(payload.event, payload));

socket.on(Events.ROBOT_JOINED, (payload) => log(payload.event, payload));
socket.on(Events.ROBOT_LEFT, (payload) => log(payload.event, payload));

socket.on(Events.TEAM_CREATED, (payload) => log(payload.event, payload));
socket.on(Events.TEAM_USER_JOINED, (payload) => log(payload.event, payload));
socket.on(Events.TEAM_USER_LEFT, (payload) => log(payload.event, payload));
socket.on(Events.TEAM_DELETED, (payload) => log(payload.event, payload));
