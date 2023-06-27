const { User } = require('../db');

const loginController = (dataUser) => {
  const { displayName, email, photos } = dataUser;
  const photoUrl = photos[0].value;
  //console.log(dataUser);
  return new Promise((resolve, reject) => {
    User.findOne({ where: { email: email } })
      .then((existingUser) => {
        if (existingUser) {
          const errorMessage = 'El correo electrónico ya está registrado';
          reject(errorMessage);
        } else {
          User.create({
            name: displayName,
            email: email,
            profilePict: photoUrl,
          })
            .then((newUser) => {
              resolve(newUser);
            })
            .catch((error) => {
              reject(error);
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  loginController,
};
