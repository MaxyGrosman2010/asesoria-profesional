const {User} = require('../db');

const findUserByName = (name) => User.findOne({where: {name: name}})

module.exports = findUserByName;