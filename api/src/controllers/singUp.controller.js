const { User } = require('../db.js');
const hashPassword = require('../utils/hashPassword.js');
const template = require('../utils/templateCreation');
const sendEmailNotification = require('../utils/senderMail');
const fs = require('fs');
const path = require('path');

const singUpController = async (req, typeNotification) => {
  try {
    const { name, password, email, profilePict } = req;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return { error: 'El email ya está registrado' };
    }

    let passwordSinUp = await hashPassword(password);

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
