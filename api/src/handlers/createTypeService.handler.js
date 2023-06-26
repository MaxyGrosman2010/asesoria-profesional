const createNewTypeService = require('../controllers/createNewTypeService.controller')

const createTypeService = async(req, res) => {
    const {typeService} = req.body;

    const newTypeService = await createNewTypeService(typeService);

    res.status(200).json(newTypeService);
};

module.exports = createTypeService;