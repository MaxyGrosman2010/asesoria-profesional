const passport = require('passport');
require('../middleware/passport');
const loginController = require('../controllers/getLogInControllerGoogle');
const dotenv = require('dotenv');
dotenv.config();
const { URL_DEPLOY_FRONT } = process.env;

const getLoginHandler = (req, res) => {
  res.send("<button><a href='/auth'>Login With Google</a></button>");
};

const authenticateHandler = passport.authenticate('google', {
  scope: ['email', 'profile'],
});

const authCallbackHandler = passport.authenticate('google', {
  successRedirect: '/auth/callback/success',
  failureRedirect: '/auth/callback/failure',
});

const loginSuccessHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.redirect('/auth/callback/failure');
      return;
    }

    const dataUser = req.user;
    const { id, User_id, displayName, email, photos, isAdmin, isSuperAdmin } =
      req.user;
    /*const frontUser = {
      User_id: User_id,
      idGoogle: id,
      name: displayName,
      email: email,
      profilePict: photos[0],
    };*/

    const newUser = await loginController.loginController(dataUser);
    //console.log('datauser linea 42 google handler:', dataUser);
    console.log('Nuevo usuario agregado:', newUser);
    const updatedFrontUser = {
      User_id: newUser.updatedDataUser.User_id,
      idGoogle: newUser.updatedDataUser.id,
      name: newUser.updatedDataUser.displayName,
      email: newUser.updatedDataUser.email,
      profilePict: newUser.updatedDataUser.picture,
      isAdmin: newUser.updatedDataUser.isAdmin,
      isSuperAdmin: newUser.updatedDataUser.isSuperAdmin,
    };

    res.cookie('token', newUser.token.token);
    res.send(`
      <script>
        window.opener.postMessage(${JSON.stringify(updatedFrontUser)}, ${
      process.env.URL_DEPLOY_FRONT
    } );
        window.close();
      </script>
    `);
  } catch (error) {
    console.error('ALERTA:', error);
    // Respondo si el usuario existe.
  }
};

const loginFailureHandler = (req, res) => {
  res.send('Error');
};

const getLogoutHandler = function (req, res, next) {
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
};

module.exports = {
  getLoginHandler,
  authenticateHandler,
  authCallbackHandler,
  loginSuccessHandler,
  loginFailureHandler,
  getLogoutHandler,
};
