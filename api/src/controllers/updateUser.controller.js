const {User} = require('../db');
const firebaseUploader = require('../utils/firebaseUploader');

const updateUser = async(id, name, email, password, cellPhone, file) => {

    const uploaded = await firebaseUploader(file);

    const user = await User.update({
        name: name, 
        email: email, 
        password: password, 
        cellPhone: cellPhone,
        profilePict: uploaded 
    }, {where: {id: id}});

    return user;
}

module.exports = updateUser;