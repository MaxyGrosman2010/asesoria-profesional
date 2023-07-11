const { User } = require('../db.js');
const hashPassword = require('../utils/hashPassword.js');
const template = require('../utils/templateCreation');
const sendEmailNotification = require('../utils/senderMail');
const fs = require('fs');
const path = require('path');

const singUpController = async (req, typeNotification) => {
  try {
    const { name, password, email, profilePict } = req;

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
      profilePict,
    });

    await newUser.save();

    const filePath = path.join(
      __dirname,
      '..',
      'views',
      'creationUserNotification.hbs'
    );

    const templateUserCreation = fs.readFileSync(filePath, 'utf-8');

    const compiledTemplate = template(templateUserCreation, { name: name });

    return sendEmailNotification(
      typeNotification,
      newUser.email,
      compiledTemplate
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = singUpController;
