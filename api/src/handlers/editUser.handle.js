const updateUser = require('../controllers/updateUser.controller');

const userEdit = async(req, res) => {
    try{
        const { name, password, cellPhone} = req.body;

        const userUpdate = await updateUser(req.id, name, req.email, password, cellPhone, req.file);

        res.status(200).json(userUpdate);
    }catch(error){
        
        console.log(error);
        res.status(404).json(error);
    }
};

module.exports = userEdit;