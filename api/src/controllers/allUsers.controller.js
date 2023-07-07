const {User, Service, TypeService} = require('../db');

const getAllUsers = (id) => User.findAll({
    include: [
        {
            model: Service,
            include: [
                {
                    model: TypeService
                }
            ]
        }
    ]
});

module.exports = getAllUsers;