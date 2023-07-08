const {User} = require('../db');

const findUserById = (name) => User.findOne({where: {name: name}})

module.exports = findUserById;