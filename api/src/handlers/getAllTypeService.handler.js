const allTypeServices = require('../controllers/allTypeServices.controller');

const getAllTypeService = async(req, res) => {
    try{
        const services = await allTypeServices();

        res.status(200).json(services);
    }catch(error){
        console.log(error);
        res.status(404).json(error);
    }
};

module.exports = getAllTypeService;