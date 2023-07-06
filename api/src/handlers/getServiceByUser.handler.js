const getUserWithServicesById = require('../controllers/getUserWithServicesById.controller');

const getServiceByUserId = async(req, res) => {
    try{

        const userWithService = await getUserWithServicesById(req.id);

        if(!userWithService) return res.status(422).json({message: "Este usuario no existe"});

        const {Services} = userWithService;

        const services = Services.map((service) => {
            const {id, name, price, description, files, TypeServices} = service;
            const {type} = TypeServices[0];
            const result = {id, name, price, description, files, type};

            return result;
        });

        return res.status(200).json(services);
    }catch(error){
        
        console.log(error);
        res.status(404).json(error);
    };
};

module.exports = getServiceByUserId;