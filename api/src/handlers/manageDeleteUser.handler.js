const findUserById = require('../controllers/findUserById.controller');
const findUserByName = require('../controllers/findUserByName.controller');
const manageLogicalDeleteUser = require('../controllers/manageLogicalDeleteUser.controller');

const logicalDeleteUser = async(req, res) => {

    try{

        const admin = await findUserById(req.id);

        if(!admin) return res.status(404).json({message: "El usuario no existe"});

        if(!admin?.isAdmin) return res.status(404).json({message: "No posee los derechos para realizar esta accion"});

        const {name} = req.body;

        const userToDelete = await findUserByName(name);

        await manageLogicalDeleteUser(userToDelete);

        const updated = await findUserByName(name);

        return res.status(200).json(updated);
        
    }catch(error){

        res.status(404).json(error);

    };
};

module.exports = logicalDeleteUser;