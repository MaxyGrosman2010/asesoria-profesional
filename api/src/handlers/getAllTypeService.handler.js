const allTypeServices = require('../controllers/allTypeServices.controller');

const getAllTypeService = async(req, res) => {
    const services = await allTypeServices();

    res.status(200).json(services);
};

module.exports = getAllTypeService;