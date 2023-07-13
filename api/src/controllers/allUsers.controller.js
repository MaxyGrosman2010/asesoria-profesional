const {User, Service, TypeService} = require('../db');

const getAllUsers = (id) => User.findAll({
    
    include: [
        {
            model: Service,
        }
    ]
});

module.exports = getAllUsers;