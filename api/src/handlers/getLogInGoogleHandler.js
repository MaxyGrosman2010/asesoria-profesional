const passport = require("passport");
require("../middleware/passport");
const loginController = require("../controllers/getLogInControllerGoogle");

const getLoginHandler = (req, res) => {
  res.send("<button><a href='/auth'>Login With Google</a></button>");
};

const authenticateHandler = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const authCallbackHandler = passport.authenticate("google", {
  successRedirect: "/auth/callback/success",
  failureRedirect: "/auth/callback/failure",
});

const loginSuccessHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.redirect("/auth/callback/failure");
      return;
    }

    //console.log(req.user);
    const dataUser = req.user;

    const newUser = await loginController.loginController(dataUser);

    //console.log("Nuevo usuario agregado:", newUser.displayName);
    const updatedFrontUser = {
      User_id: newUser.User_id,
      idGoogle: newUser.id,
      name: newUser.displayName,
      email: newUser.email,
      profilePict: newUser.picture,
    };
   console.log(newUser.token.token);
    res.cookie('token', newUser.token.token);
    res.send(`
      <script>
        window.opener.postMessage(${JSON.stringify(
          updatedFrontUser
        )}, 'http://localhost:5173');
        window.close();
      </script>
    `);
  } catch (error) {
    console.error("ALERTA:", error);
    // Respondo si el usuario existe.
  }
};

const loginFailureHandler = (req, res) => {
  res.send("Error");
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
      res.redirect("/loginGoogle");
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
