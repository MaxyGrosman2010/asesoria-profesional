const {User} = require('../db');

const manageLogicalDeleteUser = async(user) => {

    const updated = await User.update(
    {
        isDeleted: !user.isDeleted
    },
    {
        where: {id: user.id}
    });

    return updated;
};

module.exports = manageLogicalDeleteUser;