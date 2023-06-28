const {User} = require('../db');
const firebaseUploader = require('../utils/firebaseUploader');

const updateUser = async(id, name, email, password, cellPhone, file) => {

    const uploaded = await firebaseUploader(file);

    const updated = User.update(
        {id: id},
        {where: {
            name: name, 
            email: email, 
            password: password,
            cellPhone: cellPhone,
            profilePict: uploaded
    }});

    return updated;
}

module.exports = updateUser;