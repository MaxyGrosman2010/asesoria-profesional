const { validationResult } = require("express-validator");
const  singInController  = require("../controllers/singIn.controller");

const singInHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new Error(errors.throw());

    const tokenReceived = await singInController(req.body);

    if (tokenReceived.error) return res.status(401).json(tokenReceived);
        
    return (
      res
        .status(200)
        .json({
          status: "inicio de sesion exitoso",
          token: tokenReceived.token,
          expires: new Date(Date.now() + tokenReceived.expireIn * 1000),
          name: tokenReceived.nameUser,
          profilePict: tokenReceived.profilePict,
          isAdmin: tokenReceived.isAdmin,
          isSuperAdmin: tokenReceived.isSuperAdmin
        })
    );
  } catch (error) {

    return res.status(401).json({
      error: "campos incompletos o su tipo no coincide con el indicado",
    });
  }
};


module.exports = { singInHandler };