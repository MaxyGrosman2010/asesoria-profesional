const findUserById = require('../controllers/findUserById.controller');
const getAllUsers = require('../controllers/allUsers.controller');

const getAllUsersInfo = async(req, res) => {
    try{

        // const existUser = await findUserById(req.id);

        // if(!existUser) return res.status(404).json({message: "El usuario no existe"});
        
        // if(!existUser?.isAdmin) return res.status(404).json({message: "No tenes la autoridad para acceder a esta informacion"});

        const users = await getAllUsers();

        const response = users.map((user) => {

            const newUser = {
                name: user.name,
                email: user.email,
                profilePict: user.profilePict,
                isAdmin: user.isAdmin,
                isSuperAdmin: user.isSuperAdmin,
                isDeleted: user.isDeleted,
                cantService: user.Services.length
            };

            return newUser;

        });

        res.status(200).json(response);

    }catch(error){

        res.status(404).json(error);
        
    };
};

module.exports = getAllUsersInfo;