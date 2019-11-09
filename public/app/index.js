
/**
 * Comunication Controller
 * 
 */
class ComunicationController {
  Events = {
    WELLCOME: 'wellcome',
  
    USER_JOINED: 'ar.lrf.user.joined',
    USER_LEFT: 'ar.lrf.user.left',
  
    ROBOT_JOINED: 'ar.lrf.robot.joined',
    ROBOT_LEFT: 'ar.lrf.robot.left',
  
    TEAM_CREATED: 'ar.lrf.team.created',
    TEAM_USER_JOINED: 'ar.lrf.team.user_joined',
    TEAM_USER_LEFT: 'ar.lrf.team.user_left',
    TEAM_DELETED: 'ar.lrf.team.deleted',
  };
  socket= undefined;

  constructor() {
    this.socket = io(); //load socket.io-client and connect to the host that serves the page
  }

  get Events() { return this.Events }

  on(event, handler) {
    const found = Object.values(this.Events).find( evtValue => evtValue === event);
    if(!found) {
      throw new Error(`Unable to listen Undeclared event '${event}'`);
    }
    this.socket.on(event, handler)
  }

  debug() {
    Object.keys(this.Events).map((key) => this.socket.on(this.Events[key], payload => {
      console.log(payload.event, payload)
    }));
  }
}

/**
 * User Controller
 * 
 */
class UserController {
  users = {};
  me = undefined;

  constructor(comunication) {
    comunication.on(comunication.Events.WELLCOME, payload => {
      const user = Object.assign({},payload);
      delete user.event;
      this.me = user;
    });
    comunication.on(comunication.Events.USER_JOINED, payload => {
      const user = Object.assign({},payload);
      delete user.event;
      this.users[user.id] = Object.assign({},payload);
    });
    comunication.on(comunication.Events.USER_LEFT, payload => {
      delete this.users[payload.id];
    });
  }

  get all() {
    return this.users
  }

  get me() {
    return this.me
  }

  async rename(name) {
    try {
      const user = await fetch(`/api/users/${this.me.id}`, { method: 'PUT', body: { name } })
      me.name = user.name;
    } catch (err) {
      console.error('Error Updating Username', err);
    }
  }
}


class RobotController {
  robots = {};

  constructor(comunication) {
    comunication.on(comunication.Events.ROBOT_JOINED, payload => {
      const robot = Object.assign({},payload);
      delete robot.event;
      this.robots[payload.id] = robot;
    });
    comunication.on(comunication.Events.ROBOT_LEFT, payload => {
      delete this.robots[payload.id];
    });    
  }

  get all() {
    return this.robots;
  }
}

function App(debug = true) {
  const comunicationController = new ComunicationController();
  if(debug) {
    comunicationController.debug();
  }
  const userController = new UserController(comunicationController);
  const robotController = new RobotController(comunicationController);
  return {
    controllers: {
      comunication: comunicationController,
      user: userController,
      robot: robotController
    }
  }
}