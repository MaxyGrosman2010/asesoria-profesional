const {User} = require('../db');

const updateUser = (id, name, email, password, cellPhone, profilePict) => 
    User.update(
        {id: id},
        {where: {
            name: name, 
            email: email, 
            password: password,
            cellPhone: cellPhone,
            profilePict: profilePict
        }}
);

module.exports = updateUser;