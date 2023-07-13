const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { AUTH_ROUNDS } = process.env;


const hashPassword = async (password) => {
  try {
    const saltRounds = parseInt(AUTH_ROUNDS);
    const passwordSinUp = await bcrypt.hash(password, saltRounds);

    return passwordSinUp;
  } catch (error) {
    console.log(error);
  }
};

module.exports = hashPassword;
