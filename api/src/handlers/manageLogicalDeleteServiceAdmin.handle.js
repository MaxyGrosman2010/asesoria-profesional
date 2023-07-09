const findUserById = require('../controllers/findUserById.controller');
const findServiceById = require('../controllers/serviceById.controller');
const manageLogicalDeleteService = require('../controllers/manageLogicalDeleteService.controller');

const logicalDeleteServiceAdmin = async(req, res) => {

    try{

        const user = await findUserById(req.id);

        if(!user) return res.status(404).json({message: "El usuario no existe"});

        const {id} = req.body;

        const serviceToDelete = await findServiceById(id);

        if(!user?.isAdmin) 
            return res.status(404).json({

                message: "No posee lo derechos para eliminar este servico"
                
        });

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

        res.status(404).json(error);

    };
};

module.exports = logicalDeleteServiceAdmin;