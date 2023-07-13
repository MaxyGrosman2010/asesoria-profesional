const findUserById = require('../controllers/findUserById.controller');

const getUserById = async(req, res) => {
    try{

        const existUser = await findUserById(req.id);

        if(!existUser) return res.status(422).json({message: "This user doesn't exist"});
        if(existUser?.isDeleted) return res.status(404).json({message: "This user doesn't exist"});
        const response = {
            name: existUser.name,
            profilePict: existUser.profilePict
        };

        return res.status(200).json(response);
    }catch(error){ res.status(422).json(error) };
};

module.exports = getUserById;