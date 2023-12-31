require("dotenv").config();
const jwt = require("jsonwebtoken");

let expiresIn = 1000 * 6 * 60;

const tokenCreated = (user, shhh) => {
  try {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        password: user.password,
      },
      shhh,
      { expiresIn }
    );
    return { token, expiresIn };
  } catch (error) {
  }
};

const refreshToken = (user, shhh) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, password: user.password },
      shhh,
      {
        expiresIn,
      }
    );

    return refreshToken;





 
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  refreshToken,
  tokenCreated,
};
