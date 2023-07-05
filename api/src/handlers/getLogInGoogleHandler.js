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
    // console.log('req.user', req.user);
    const dataUser = req.user;
    const { id, User_id, displayName, email, photos } = req.user;

    loginController
      .loginController(dataUser)
      .then((newUser) => {
        console.log('Nuevo usuario agregado:', newUser.displayName);
        const frontUser = {
          User_id: newUser.User_id,
          idGoogle: newUser.id,
          name: newUser.displayName,
          email: newUser.email,
          profilePict: newUser.photos[0],
        };
        console.log('esto sale para el front:', frontUser);
        res.send(`
          <script>
            window.opener.postMessage(${JSON.stringify(
              frontUser
            )}, 'http://localhost:5173');
            window.close();
          </script>
        `);
      })
      .catch((error) => {
        console.error('ALERTA:', error);
        // Respondo si el usuario existe.
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
