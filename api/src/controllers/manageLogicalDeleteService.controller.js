const {Service} = require('../db');

const manageLogicalDeleteService = async(service) => {
    
    const updated = await Service.update(
    { isDeleted: !service.isDeleted }, { where: {id: service.id} });

    return updated;
};

module.exports = manageLogicalDeleteService;