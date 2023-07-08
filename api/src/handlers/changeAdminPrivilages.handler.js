const findUserById = require('../controllers/findUserById.controller');
const findUserByName = require('../controllers/findUserByName.controller');
const updateIsAdmin = require('../controllers/updateIsAdmin.controller');

const changeAdminPrivilages = async(req, res) => {
    try{
        const existUser = await findUserById(req.id);

        if(!existUser) return res.status(404).json({message: "El usuario no existe"});

        if(!existUser.isSuperAdmin) return res.status(404).json({message: "No posee los derechos para realizar esta accion"});

        const {name} = req.body;

        const update = await findUserByName(name);

        await updateIsAdmin(update);

        const updated = await findUserByName(name);

        return res.status(200).json(updated);

    }catch(error){

        console.log(error);
        res.status(404).json(error);

    };
};

module.exports = changeAdminPrivilages;