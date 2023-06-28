require("dotenv").config();
const jwt = require("jsonwebtoken");

let expiresIn = 60 * 15;

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
    return token;
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
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: !(process.env.MODO === "developer"),
    //   expires: new Date(Date.now() + expiresIn * 1000),
    //   sameSite: "none",
    // });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  refreshToken,
  tokenCreated,
};
