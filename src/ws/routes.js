const controller = require('./controller');
const middleware = require('./middleware');

module.exports = server => {
  
  server.put(
      'users/:user_id',
      middleware.valid_user_needed,
      middleware.user_alias_needed,
      controller.user_update
    )
};