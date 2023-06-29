const updateUser = require('../controllers/updateUser.controller');

const userEdit = async(req, res) => {
    const {id, name, email, password, cellPhone} = req.body;

    const userUpdate = await updateUser(id, name, email, password, cellPhone, req.file);

    res.status(200).json(userUpdate);
};

module.exports = userEdit;