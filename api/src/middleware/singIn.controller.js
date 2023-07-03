
const { Users } = require("../db.js");
const bcrypt = require("bcrypt");
//const hashPassword = require('../utils/hashPassword.js');
const { tokenCreated, refreshToken } = require("../utils/createToken.js");
 const { SECRET_KEY } = process.env;
// //! colocar en su archivo .env SECRET_KEY=${su clave}


const singInController = async (req) => {
  try {

    const { email, password } = req;

    //Buscamos el usuario en la BBDD
    const user = await Users.findOne({ where: { email } });

    //Verificamos si el usuario existe y si la contraseña es correcta
    const passCompare = await bcrypt.compare(password, user.password);
    if (!user || !passCompare) return { message: "Credenciales invalidas" };

    //Creamos el token
    const token = tokenCreated(user, SECRET_KEY);
    //const refreshedToken = refreshToken(newUser, SECRET_KEY);
    return token;


  } catch (error) {
    console.log(error);
  }
};

module.exports = singInController;
