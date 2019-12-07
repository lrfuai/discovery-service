
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

  constructor(config) {
    const {
      debug = true 
    } = config; 
    this.socket = io(); //load socket.io-client and connect to the host that serves the page
    if(debug) {
      Object.keys(this.Events).map((key) => this.socket.on(this.Events[key], payload => {
        console.log(payload.event, payload)
      }));
    }
  }

  get Events() { return this.Events }

  on(event, handler) {
    const found = Object.values(this.Events).find( evtValue => evtValue === event);
    if(!found) {
      throw new Error(`Unable to listen Undeclared event '${event}'`);
    }
    this.socket.on(event, handler)
  }
}

/**
 * User Controller
 * 
 */
class UserController {
  _users = {};
  _me = undefined;

  constructor(comunication) {
    comunication.on(comunication.Events.WELLCOME, payload => {
      const { users} = Object.assign({},payload);
      delete user.event;
      this._me = user;
      this._users = users
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

  get all() { return this._users }

  get me() { return this._me }

  async rename(name) {
    try {
      const user = await fetch(`/api/users/${this._me.id}`, { method: 'PUT', body: { name } })
      this._me.name = user.name;
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

class App {

  _comunicationController;
  _userController;
  _robotController;

  constructor(config) {
    this._comunicationController = new ComunicationController(config);
    this_userController = new UserController(this._comunicationController);
    this_robotController = new RobotController(this._comunicationController);
    return {
      controllers: {
        comunication: comunicationController,
        user: userController,
        robot: robotController
      }
    }
  }

  get Comunication() { return this._comunicationController; }

  get User() { return this._userController; }

  get Robot() { return this._robotController; }
}