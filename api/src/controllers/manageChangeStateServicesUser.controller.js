const {Service} = require('../db');

const manageChangeStateServicesUser = async(user) => {

    const userWithServices = await findUserById(user.id);

    const {Services} = userWithServices;

    const updated = Services.map(async(service) => await Service.update(
        {
            userIsDeleted: user.isDeleted
        },
        {
        where: {name: service.name, user_id: user.id}
        }
    ));

    return updated;
};

module.exports = manageChangeStateServicesUser;