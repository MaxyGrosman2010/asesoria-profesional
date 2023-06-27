const passport = require('passport');
require('../middleware/passport');
const loginController = require('../controllers/getLogInControllerGoogle');

const getLogInHandler = {
  getLogin: (req, res) => {
    res.send("<button><a href='/auth'>Login With Google</a></button>");
  },
  authenticate: passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
  authCallback: passport.authenticate('google', {
    successRedirect: '/auth/callback/success',
    failureRedirect: '/auth/callback/failure',
  }),
  loginSuccess: (req, res, next) => {
    if (!req.user) res.redirect('/auth/callback/failure');
    //res.send('Welcome ' + req.user.email);
    const dataUser = req.user;
    const { displayName, email } = req.user;
    const frontUser = {
      name: displayName,
      email: email,
    };
    //console.log(dataUser);
    res.send(`
    <script>
      window.opener.postMessage(${JSON.stringify(
        frontUser
      )}, 'http://localhost:5173');
      window.close();
    </script>
  `);

    loginController
      .loginController(dataUser)
      .then((newUser) => {
        console.log('Nuevo usuario agregado:', newUser);
        // Hacer cualquier otra acción necesaria después de agregar el usuario
      })
      .catch((error) => {
        console.error('Error al verificar y crear el usuario:', error);
        // Manejar el error de alguna manera adecuada
      });
  },

  loginFailure: (req, res) => {
    res.send('Error');
  },

  getLogout: function (req, res, next) {
    req.session.user = null;
    req.session.save(function (err) {
      if (err) {
        // Manejo de errores al guardar la sesión
        return next(err);
      }
      // destroy the session and remove the session cookie
      req.session.destroy(function (err) {
        if (err) {
          // Manejo de errores al destruir la sesión
          return next(err);
        }
        // redirect to the root URL after logout
        res.redirect('/loginGoogle');
      });
    });
  },
};

module.exports = getLogInHandler;
