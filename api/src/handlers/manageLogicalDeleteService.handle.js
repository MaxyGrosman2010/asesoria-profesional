const findUserById = require('../controllers/findUserById.controller');
const findServiceById = require('../controllers/serviceById.controller');
const manageLogicalDeleteService = require('../controllers/manageLogicalDeleteService.controller');

const logicalDeleteUser = async(req, res) => {

    try{

        const admin = await findUserById(req.id);

        if(!admin) return res.status(404).json({message: "El usuario no existe"});

        if(!admin?.isAdmin) return res.status(404).json({message: "No posee los derechos para realizar esta accion"});

        const {id} = req.body;

        const serviceToDelete = await findServiceById(id);

        await manageLogicalDeleteService(serviceToDelete);

        const updated = await findServiceById(id);

        const {type} = updated.TypeServices[0];

        const response = {
            id: updated.id,
            name: updated.name,
            description: updated.description,
            price: updated.price,
            files: updated.files,
            isDeleted: updated.isDeleted,
            typeService: type,
            user_id: updated.user_id
        }

        return res.status(200).json(response);
        
    }catch(error){
        console.log(error);
        res.status(404).json(error);

    };
};

module.exports = logicalDeleteUser;