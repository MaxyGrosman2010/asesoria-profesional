const createServiceController = require('../controllers/createService.controller')

const createService = async(req, res) => {
    const {name, typeService, price, description} = req.body;
    
    const existTypeService = await findTypeService(typeService);

    if(!existTypeService) return res.status(422).json({message: "It doesn't exist the type of Service send"});

    const newService = await createServiceController(name, price, description);
    
    linkTypeserviceService(existTypeService, newService);

    res.status(200).json({message: "Success"});
};

module.exports = createService;