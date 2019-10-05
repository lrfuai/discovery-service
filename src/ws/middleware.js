const Joi = require('@hapi/joi');
const logger = require('../logger');
const {getById} = require('../services/user.service');

const valid_user_needed = (req, res) => {
  const {user_id} = req.params;

  const {error} = Joi.validate(Joi.string().min(3),user_id);
  if(error !== null) {
    const message = { error: error.message };
    logger.info("Validation error", message);
    return res.status(400).send(message);
  }

  try {
    req.user = getById(user_id);
    next();
  } catch(error) {
    logger.info("Validation error", error);
    return res.status(400).send(error);
  }
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
  valid_user_needed,
  user_alias_needed
}