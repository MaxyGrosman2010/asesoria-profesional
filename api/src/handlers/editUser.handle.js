const updateUser = require('../controllers/updateUser.controller');

const userEdit = async(req, res) => {
    try{
        const { name, password} = req.body;

        const userUpdate = await updateUser(req.id, name, password, req.file);

        let response = {
            name: userUpdate.name,
            email: userUpdate.email,
            cellPhone: userUpdate.cellPhone,
            profilePict: userUpdate.profilePict
        };

        return res.status(200).json(response);
    }catch(error){
        
        console.log(error);
        res.status(404).json(error);
    }
};

module.exports = userEdit;