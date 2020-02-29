
/**
 * Comunication Controller
 * 
 */
class ComunicationController {
  _Events = {
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
  _socket = undefined;

  constructor() {
    this._socket = io(); //load socket.io-client and connect to the host that serves the page
    Object.keys(this._Events).map(
      key => this._socket.on(this._Events[key], payload => {
        console.log(payload.event, payload)
      })
    );
  }

  get Events() { return this._Events }

  on(event, handler) {
    const found = Object.values(this._Events).find(evtValue => evtValue === event);
    if (!found) {
      throw new Error(`Unable to listen Undeclared event '${event}'`);
    }
    this._socket.on(event, handler)
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
      const { user, users } = payload;
      this._me = user;
      this._users = users
    });
    comunication.on(comunication.Events.USER_JOINED, payload => {
      const user = Object.assign({}, payload);
      delete user.event;
      this._users[user.id] = Object.assign({}, payload);
    });
    comunication.on(comunication.Events.USER_LEFT, payload => {
      delete this._users[payload.id];
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

/**
 * 
 * 
 */
class RobotController {
  _robots = {};

  constructor(comunication) {
    comunication.on(comunication.Events.WELLCOME, payload => {
      const { robots } = payload;
      this._robots = robots;
    });
    comunication.on(comunication.Events.ROBOT_JOINED, payload => {
      const robot = Object.assign({}, payload);
      delete robot.event;
      this._robots[payload.id] = robot;
    });
    comunication.on(comunication.Events.ROBOT_LEFT, payload => {
      delete this._robots[payload.id];
    });
  }

  get all() {
    return this.robots;
  }
}

/**
 * 
 * 
 */
class App {

  _comunicationController;
  _userController;
  _robotController;

  constructor(config) {
    this._comunicationController = new ComunicationController(config);
    this._userController = new UserController(this._comunicationController);
    this._robotController = new RobotController(this._comunicationController);
  }

  get Comunication() { return this._comunicationController; }

  get User() { return this._userController; }

  get Robot() { return this._robotController; }
}