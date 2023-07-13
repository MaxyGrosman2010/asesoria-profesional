const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const { tokenCreated } = require("../utils/createToken.js");
const { SECRET_KEY } = process.env;

const singInController = async (req) => {
  try {
    const { email, password } = req;

    const user = await User.findOne({ where: { email } });


    if (!user) return { error: "Credenciales invalidas" };

    if(user?.isDeleted) return { error: "Este usuario fue baneado o eliminado"};

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) return { error: "Credenciales invalidas" };


    const token = tokenCreated(user, SECRET_KEY);

    const nameUser = user.name;
    const profilePict = user.profilePict;
    const isAdmin = user.isAdmin;
    const isSuperAdmin = user.isSuperAdmin

    return { token: token.token, nameUser, profilePict, isAdmin, isSuperAdmin, expireIn: token.expiresIn };
  } catch (error) {
    console.log(error);
  }
};

module.exports = singInController;
