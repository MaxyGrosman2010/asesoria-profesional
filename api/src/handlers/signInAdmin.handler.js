const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { tokenCreated } = require("../utils/createToken.js");
const findUserByEmail = require('../controllers/findUserByEmail.controller.js');
const { SECRET_KEY } = process.env;

const signInAdmin = async(req, res) => {
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()) throw new Error(errors.throw());



        const {email, password} = req.body;

        const user = await findUserByEmail(email);



        if(!user) return res.status(404).json({error: "Credenciales invalidas"});



        if(user?.isDeleted) return res.status(404).json({ error: "Este usuario fue baneado o eliminado"});



        if(!user?.isAdmin) return res.status(404).json({error: "No es un admin"});



        const passCompare = await bcrypt.compare(password, user?.password);



        if(!passCompare) return res.status(404).json({ error: "Credenciales invalidas" });



        const token = await tokenCreated(user, SECRET_KEY);



        // const response = {
        //     token,
        // }

        return res.status(200).json(token);

    }catch(error){

        return res.status(404).json(error);
        
    };
};

module.exports = signInAdmin;