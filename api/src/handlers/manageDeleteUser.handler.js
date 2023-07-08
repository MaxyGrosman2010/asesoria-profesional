const findUserById = require('../controllers/findUserById.controller');
const findUserByName = require('../controllers/findUserByName.controller');
const manageLogicalDeleteUser = require('../controllers/manageLogicalDeleteUser.controller');
const getUserWithServicesById = require('../controllers/getUserWithServicesById.controller');
const changeServiceStateToUser = require('../controllers/changeServiceStateToUser.controller')

const logicalDeleteUser = async(req, res) => {

    try{

        const admin = await findUserById(req.id);

        if(!admin) return res.status(404).json({message: "El usuario no existe"});

        if(!admin?.isAdmin) return res.status(404).json({message: "No posee los derechos para realizar esta accion"});

        const {name} = req.body;

        const userToDelete = await findUserByName(name);

        await manageLogicalDeleteUser(userToDelete);

        const userWithService = await getUserWithServicesById(req.id);

        const updated = await findUserByName(name);
        
        const {Services} = userWithService;
        
        Services.map(async(service) => await changeServiceStateToUser(service, updated?.isDeleted))

        return res.status(200).json(updated);
        
    }catch(error){

        res.status(404).json(error);

    };
};

module.exports = logicalDeleteUser;