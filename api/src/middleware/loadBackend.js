const createNewTypeService = require('../controllers/createNewTypeService.controller');

const loadBackend = () => {
    const typeServices = [
        'Gastronomia',
        'Legal',
        'Medicina', 
        'Automotor', 
        'Construccion', 
        'Educacion', 
        'Tech', 
        'Otros'
    ];

    typeServices.map((typeService) => createNewTypeService(typeService));

    return typeServices;
};

module.exports = loadBackend;