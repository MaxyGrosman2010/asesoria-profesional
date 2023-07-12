const {User} = require('../db');

const updateIsAdmin = async(user) => {

    const updated = await User.update(
    { isAdmin: !user.isAdmin }, { where: {id: user.id} } );

    return updated;
};

module.exports = updateIsAdmin;