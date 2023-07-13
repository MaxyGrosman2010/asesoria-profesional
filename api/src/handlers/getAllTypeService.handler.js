const allTypeServices = require('../controllers/allTypeServices.controller');

const getAllTypeService = async(req, res) => {
    try{
        const services = await allTypeServices();

        return res.status(200).json(services);
    }catch(error){ res.status(404).json(error) };
};

module.exports = getAllTypeService;