const findUserById = require('../controllers/findUserById.controller');
const manageLogicalDeleteUser = require('../controllers/manageLogicalDeleteUser.controller');
const manageChangeStateServicesUser = require('../controllers/manageChangeStateServicesUser.controller');

const logicalDeleteUser = async(req, res) => {

    try{

        const admin = await findUserById(req.id);



        if(!admin) return res.status(404).json({message: "El usuario no existe"});



        if(!admin?.isAdmin) return res.status(404).json({message: "No posee los derechos para realizar esta accion"});



        const {id} = req.body;

        const userToDelete = await findUserById(id);



        await manageLogicalDeleteUser(userToDelete);
        
        const updated = await findUserById(id);

        await manageChangeStateServicesUser(userToDelete?.id);
        


        return res.status(200).json(updated);
        
    }catch(error){

        console.log(error);

        res.status(404).json(error);

    };
};

module.exports = logicalDeleteUser;