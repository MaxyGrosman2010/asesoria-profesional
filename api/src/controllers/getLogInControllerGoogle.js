const { User } = require('../db');

const loginController = (dataUser) => {
  const { displayName, email, photos } = dataUser;
  const photoUrl = photos[0].value;

  return new Promise((resolve, reject) => {
    User.findOne({ where: { email: email } })
      .then((existingUser) => {
        if (existingUser) {
          const updatedDataUser = {
            ...dataUser,
            User_id: existingUser.id,
          };
          resolve(updatedDataUser);
        } else {
          User.create({
            name: displayName,
            email: email,
            profilePict: photoUrl,
          })
            .then((newUser) => {
              const updatedDataUser = {
                ...dataUser,
                User_id: newUser.id,
              };
              resolve(updatedDataUser);
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
