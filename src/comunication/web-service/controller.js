
const user_update = ({user, alias},res) => {
  user.alias = alias;
}

module.exports = {
  user_update,
}