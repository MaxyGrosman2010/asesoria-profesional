const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const { tokenCreated, refreshToken } = require("../utils/createToken.js");
const { SECRET_KEY } = process.env;

const singInController = async (req) => {
  try {
    const { email, password } = req;
    console.log(password);
    //Buscamos el usuario en la BBDD
    const user = await User.findOne({ where: { email } });

    //Verificamos si el usuario existe y si la contraseña es correcta
    if (!user) return { error: "Credenciales invalidas" };

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) return { error: "Credenciales invalidas" };

    //Creamos el token
    const token = tokenCreated(user, SECRET_KEY);
    //Extaemos el nombre del usuario
    const name = user.name;
    const profilePict = user.profilePict;
    //const refreshedToken = refreshToken(newUser, SECRET_KEY);
    return { token, name, profilePict};
  } catch (error) {
    console.log(error);
  }
};

module.exports = singInController;
