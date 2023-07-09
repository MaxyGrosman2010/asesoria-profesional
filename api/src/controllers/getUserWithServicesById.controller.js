const {User, Service, TypeService} = require('../db');

const findUserById = (id) => User.findByPk(id, {

    
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

module.exports = findUserById;