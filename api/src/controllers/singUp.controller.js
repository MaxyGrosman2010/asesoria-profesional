const { User } = require("../db.js");
const hashPassword = require("../utils/hashPassword.js");
const firebaseUploader = require('../utils/firebaseUploader.js');

const singUpController = async (req, file) => {
  try {
    const { name, password, cellPhone, email } = req;

    //subimos la imagen a firebase y obtenemos su URL
    const uploadImage =await firebaseUploader(file);

    // Verificamos si el email ya existe en la base de datos
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
      profilePict: uploadImage,
      cellPhone,
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = singUpController;
