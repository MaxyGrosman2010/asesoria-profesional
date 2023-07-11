const { User } = require("../db.js");

const findUserByEmail = (email) => User.findOne({where: {email: email}});

module.exports = findUserByEmail;