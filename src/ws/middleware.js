const Joi = require('@hapi/joi');
const logger = require('../logger');

const user_id_needed = (req, res) => {
  const {user_id} = req.params;
  const {error} = Joi.validate(Joi.string().min(3),user_id);
  if(error !== null) {
    const message = { error: error.message };
    logger.info("Validation error", message);
    return res.status(400).send(message);
  }
  req.user_id = user_id;
  next();
};

const user_alias_needed = (req,res) => {
  const {alias} = req.body;
  const {error} = Joi.validate(Joi.string().min(3),alias);
  if(error !== null) {
    const message = { error: error.message };
    logger.info("Validation error", message);
    return res.status(400).send(message);
  }
  req.alias = alias;
  next();
};

module.exports = {
  user_id_needed,
  user_alias_needed
}