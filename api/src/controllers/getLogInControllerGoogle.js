const { User } = require("../db");
const { tokenCreated, refreshToken } = require("../utils/createToken.js");
const { SECRET_KEY } = process.env;

const loginController = async ( dataUser) => {
  const { displayName, email, photos } = dataUser;
  const photoUrl = photos[0].value;

  try {
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      const updatedDataUser = {
        ...dataUser,
        User_id: existingUser.id,
      };
      const token = tokenCreated(existingUser, SECRET_KEY);

      return { updatedDataUser, token };
    } else {
      const newUser = await User.create({
        name: displayName,
        email: email,
        profilePict: photoUrl,
      });

      const updatedDataUser = {
        ...dataUser,
        User_id: newUser.id,
      };

      //res.status(200).json({ token: token });
      return updatedDataUser;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginController,
};
