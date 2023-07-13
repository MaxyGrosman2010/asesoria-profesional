const {User} = require('../db');
const firebaseUploader = require('../utils/firebaseUploader');
const hashPassword = require('../utils/hashPassword')

const updateUser = async(id, name, password, file) => {

    const uploaded = await firebaseUploader(file);

    let hashedPassword = await hashPassword(password);

    const user = await User.update({
        name: name,
        password: hashedPassword, 
        profilePict: uploaded 
    }, { where: { id: id } } );

    return user;
};

module.exports = updateUser;