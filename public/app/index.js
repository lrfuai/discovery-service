var socket = io(); //load socket.io-client and connect to the host that serves the page
var Events = {
    WELLCOME : 'wellcome',

    USER_JOINED : 'ar.lrf.user.joined',
    USER_LEFT : 'ar.lrf.user.left',
    
    ROBOT_JOINED: 'ar.lrf.robot.joined',
    ROBOT_LEFT: 'ar.lrf.robot.left',
    
    TEAM_CREATED: 'ar.lrf.team.created',
    TEAM_USER_JOINED: 'ar.lrf.team.user_joined',
    TEAM_USER_LEFT: 'ar.lrf.team.user_left',
    TEAM_DELETED: 'ar.lrf.team.deleted',
}

const Emmiter = new EventTarget();
function EventController () {
    function defaultSocketEventHandler (payload) {
        const{event = 'unknown'} = payload;
        document.getElementById('interface').innerHTML += `<div><b>${event}</b><pre>${JSON.stringify(payload)}</pre></div>`;
        console.info(event, payload);
        Emmiter.dispatchEvent(event, payload);
    }

    // Handling All Declared Events
    Object.keys(Events).map((key) => socket.on(Events[key], defaultSocketEventHandler) );

    return {
        Emmiter,
        Events
    }
}

const me = {};
const users = [];
function UserController() {
    return {
        rename: async function(name) {
            try {
                const user = await fetch(`/api/users/${me.id}`, { method: 'PUT', body: { name } })
                me.name = user.name;
            } catch(err) {
                console.error('Error Updating Username', err);
            }
        },
        all: users,
        me: user,
    }
}

const robots = {};
function RobotController() {
    return {
        rename: function(name) {
            return fetch(`/api/users/${user.id}`, { method: 'PUT', body: { name } })
        },
        me: user,
    }
}