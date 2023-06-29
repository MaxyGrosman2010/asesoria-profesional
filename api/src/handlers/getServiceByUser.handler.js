const getUserWithServicesById = require('../controllers/getUserWithServicesById.controller');

const getServiceByUserId = async(req, res) => {
    const {id} = req.params;

    const userWithService = await getUserWithServicesById(id);

    if(!userWithService) return res.status(422).json({message: "Este usuario no existe"});

    const {Services} = userWithService;

    res.status(200).json(Services);
};

module.exports = getServiceByUserId;