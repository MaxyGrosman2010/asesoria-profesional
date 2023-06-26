const createServiceController = require('../controllers/createService.controller');
const findTypeService = require('../controllers/findTypeService.controller');
const linkTypeserviceService = require('../controllers/linkTypeserviceService.controller');

const createService = async(req, res) => {
    const {name, typeService, price, description} = req.body;
    
    const existTypeService = await findTypeService(typeService);

    if(!existTypeService) return res.status(422).json({message: "It doesn't exist the type of Service send"});

    const newService = await createServiceController(name, price, description);
    
    await linkTypeserviceService(existTypeService, newService);

    res.status(200).json(newService);
};

module.exports = createService;