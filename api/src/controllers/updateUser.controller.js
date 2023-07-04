const {User} = require('../db');
const firebaseUploader = require('../utils/firebaseUploader');
const hashPassword = require('../utils/hashPassword')

const updateUser = async(id, name, email, password, cellPhone, file) => {

    const uploaded = await firebaseUploader(file);

    let hashedPassword = await hashPassword(password);

    const user = await User.update({
        name: name, 
        email: email, 
        password: hashedPassword, 
        cellPhone: cellPhone,
        profilePict: uploaded 
    }, {where: {id: id}});

    return user;
};

module.exports = updateUser;