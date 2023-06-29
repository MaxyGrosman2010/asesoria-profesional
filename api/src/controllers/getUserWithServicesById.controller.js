const {User, Service} = require('../db');

const findUserById = (id) => User.findByPk(id, {
    include: [
        {
            model: Service,
            required: false,
        }
    ]
});

module.exports = findUserById;