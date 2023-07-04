const { validationResult } = require("express-validator");
const  singInController  = require("../controllers/singIn.controller");
//const { MODE } = process.env;
const expiresIn = 60 * 60 * 24 * 30;

const singInHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new Error(errors.throw());

    const tokenReceived = await singInController(req.body);
    console.log(tokenReceived);
   // const nameReceived = await singInController(req.body).nameUser;
    
    if (tokenReceived.error) return res.status(401).json(tokenReceived);
    
    console.log(tokenReceived);

    return (res.status(200)
        // .cookie("token", tokenReceived, {
        //   httpOnly: true,
        //   secure: !(MODE === "Developer"),
        //   expires: new Date(Date.now() + expiresIn * 1000),
        // })
        .json({
          status: "inicio de sesion exitoso", 
          token: tokenReceived.token, 
          expires: new Date(Date.now() + expiresIn * 1000),
          nameUser: tokenReceived.nameUser, 
          profilePict: tokenReceived.profilePict}));
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "campos incompletos o su tipo no coincide con el indicado",
    });
  }
};

module.exports = { singInHandler }; 
