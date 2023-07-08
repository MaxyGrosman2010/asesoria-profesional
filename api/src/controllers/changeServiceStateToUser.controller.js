const {Service} = require('../db');

const changeServiceStateToUser = async(service, state) => {
    
    const updated = await Service.update(
    {
        isDeleted: state
    },
    {
        where: {id: service.id}
    });

    return updated;
};

module.exports = changeServiceStateToUser;