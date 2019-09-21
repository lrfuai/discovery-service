const users = require('../users');

const user_update = ({user_id, alias},res) => {
  try {
    users.getById(user_id).alias = alias;
  } catch(error) {
    res.status(400).send(error);
  }
}

module.exports = {
  user_update,
}