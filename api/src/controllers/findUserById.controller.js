const {User} = require('../db');

const findUserById = (id) => User.findByPk(id)

module.exports = findUserById;