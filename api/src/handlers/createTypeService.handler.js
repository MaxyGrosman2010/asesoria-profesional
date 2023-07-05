const createNewTypeService = require('../controllers/createNewTypeService.controller')

const createTypeService = async(req, res) => {
    try{
        const {typeService} = req.body;

        const newTypeService = await createNewTypeService(typeService);
        
        return res.status(200).json(newTypeService);
    }catch(error){
        console.log(error);
        res.status(404).json(error);
    }
};

module.exports = createTypeService;