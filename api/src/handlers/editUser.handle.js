const updateUser = require('../controllers/updateUser.controller');
const findUserById = require('../controllers/findUserById.controller');

const userEdit = async(req, res) => {
    try{
        
        const { name, password} = req.body;
        
        await updateUser(req.id, name, password, req.file);
        
        const userUpdate = await findUserById(req.id);

        let response = {
            name: userUpdate?.name,
            profilePict: userUpdate?.profilePict
        };

        return res.status(200).json(response);

    }catch(error){
        
        res.status(404).json(error);
        
    };
};

module.exports = userEdit;