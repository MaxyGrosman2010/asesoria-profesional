const allService = require('../controllers/allService.controller');

const getAllService = async(req, res) => {
    const services = await allService();

    const result = services.map((service) => {
        const {id, name, price, description, files, TypeServices} = service;
        const {type} = TypeServices;
        const result = {id, name, price, description, files, type};

        return result;
    });

    res.status(200).json(result);
};

module.exports = getAllService;