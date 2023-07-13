const {Service} = require('../db');
const findUserById = require('../controllers/findUserById.controller');

const manageChangeStateServicesUser = async(id) => {

    const userWithServices = await findUserById(id);

    const {Services} = userWithServices;

    const updated = await Services?.map(async(service) => await Service.update(
        { userIsDeleted: userWithServices?.isDeleted }, 
        { where: {name: service.name, user_id: service?.user_id} }
    ));

    return updated;
};

module.exports = manageChangeStateServicesUser;