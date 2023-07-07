const findUserById = require('../controllers/findUserById.controller');
const updateIsAdmin = require('../controllers/updateIsAdmin.controller');

const getAdminPrivilages = async(req, res) => {
    try{
        const existUser = await findUserById(req.id);

        if(!existUser) return res.status(404).json({message: "El usuario no existe"});

        if(!existUser.isSuperAdmin) return res.status(404).json({message: "No posee los derechos para realizar esta accion"});

        const {id} = req.body;

        const update = await findUserById(id);

        const updated = await updateIsAdmin(update);

        return res.status(200).json(updated);

    }catch(error){

        console.log(error);
        res.status(404).json(error);

    };
};

module.exports = getAdminPrivilages;