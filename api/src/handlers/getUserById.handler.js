const findUserById = require('../controllers/findUserById.controller');

const getUserById = async(req, res) => {
    try{

        const existUser = await findUserById(req.id);

        if(!existUser) return res.status(422).json({message: "This user doesn't exist"});

        console.log(existUser);

        const response = {
            name: existUser.name,
            cellphone: existUser.cellphone,
            email: existUser.email,
            profilePict: existUser.profilePict
        };

        return res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(422).json(error);
    };
};

module.exports = getUserById;