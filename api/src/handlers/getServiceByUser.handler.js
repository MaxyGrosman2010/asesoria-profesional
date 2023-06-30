const getUserWithServicesById = require('../controllers/getUserWithServicesById.controller');

const getServiceByUserId = async(req, res) => {
    try{
        const {id} = req.params;

        const userWithService = await getUserWithServicesById(id);

        if(!userWithService) return res.status(422).json({message: "Este usuario no existe"});

        const {Services} = userWithService;

        res.status(200).json(Services);
    }catch(error){
        
        console.log(error);
        res.status(404).json(error);
    };
};

module.exports = getServiceByUserId;