const allService = require('../controllers/allService.controller');

const getAllService = async(req, res) => {
    const services = await allService();

    res.status(200).json(services);
};

module.exports = getAllService;