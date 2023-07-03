const { User } = require('../db.js');
const hashPassword = require('../utils/hashPassword.js');
const firebaseUploader = require('../utils/firebaseUploader.js');
const sendEmailNotification = require('../utils/senderMail');

const singUpController = async (req, file, typeNotification) => {
  try {
    const { name, password, cellPhone, email } = req;

    //subimos la imagen a firebase y obtenemos su URL
    const uploadImage = await firebaseUploader(file);

    // Verificamos si el email ya existe en la base de datos
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return { error: 'El email ya está registrado' };
    }

    //Hasheamos la password
    let passwordSinUp = await hashPassword(password);

    //agregamos el usuario a BBDD
    /*const newUser = await User.create({
      name,
      password: passwordSinUp,
      email,
      profilePict: uploadImage,
      cellPhone,
    });*/

    const newUser = await User.create({
      name,
      password: passwordSinUp,
      email,
    });
    await newUser.save();

    return sendEmailNotification(typeNotification, newUser.email);
  } catch (error) {
    console.log(error);
  }
};

module.exports = singUpController;
