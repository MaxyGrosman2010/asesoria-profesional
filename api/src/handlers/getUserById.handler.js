const findUserById = require('../controllers/findUserById.controller');

const getUserById = async(req, res) => {
    try{
        const {id} = req.params;

        const existUser = await findUserById(id);

        if(!existUser) return res.status(422).json({message: "This user doesn't exist"});

        return res.status(200).json(existUser);
    }catch(error){
        console.log(error);
        res.status(422).json(error);
    };
};

module.exports = getUserById;