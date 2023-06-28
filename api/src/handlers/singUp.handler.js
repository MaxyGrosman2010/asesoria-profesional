require("dotenv").config();
const singUpController  = require("../controllers/singUp.controller");
const { validationResult } = require("express-validator");

const singUp = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new Error(errors.throw());

    const siningUp = await singUpController(req.body);

    if (siningUp?.error) {
      console.log(siningUp);
      return res.status(401).json(siningUp);
    } 
    

    return res.status(200).json({
      status: "usuario creado con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "campos incompletos o su tipo no coincide con el indicado",
    });
  }
};

module.exports = singUp ;
