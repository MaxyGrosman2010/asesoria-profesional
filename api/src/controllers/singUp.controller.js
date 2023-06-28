const { User } = require("../db.js");
const hashPassword = require("../utils/hashPassword.js");
const { tokenCreated, refreshToken } = require("../utils/createToken.js");
const { SECRET_KEY } = process.env;
//! colocar en su archivo .env SECRET_KEY=${su clave}

const singUpController = async (req) => {
  try {
    const { name, password, profilePict, email } = req;

    // Verificar si el email ya existe en la base de datos
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return { error: "El email ya está registrado" };
    }

    //Hasheamos la password
    let passwordSinUp = await hashPassword(password);

    //agregamos el usuario a BBDD
    const newUser = await User.create({
      name,
      password: passwordSinUp,
      email,
      profilePict,
     
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = singUpController;
