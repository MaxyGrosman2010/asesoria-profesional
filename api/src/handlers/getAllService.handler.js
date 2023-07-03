const allService = require('../controllers/allService.controller');

const getAllService = async(req, res) => {
    try{
        const services = await allService();

        const result = services.map((service) => {
            const {id, name, price, description, files, TypeServices, user_id} = service;
            console.log(TypeServices);
            const {type} = TypeServices[0];
            
            return {id, name, price, description, files, user_id, typeService: type};
        });

        res.status(200).json(result);
    }catch(error){

        console.log(error);
        res.status(404).json(error);
    };
};

module.exports = getAllService;