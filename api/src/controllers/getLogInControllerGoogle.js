const { User } = require('../db');
const { tokenCreated } = require('../utils/createToken.js');
const { SECRET_KEY } = process.env;

const loginController = async (dataUser) => {
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
      const token = tokenCreated(newUser, SECRET_KEY);

      return { updatedDataUser, token };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginController,
};
