const { SECRET_KEY} = process.env;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {


    let token = req.headers.authorization;


    //if (!token) throw new Error();

    token = token.split("Bearer").pop().trim();
    

    const tokenized = jwt.verify(token, SECRET_KEY);
    req.id = tokenized.id;
    req.email = tokenized.email;
    // res.status(200).json({
    //   msg: "access granted",
    // });
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized access" });
  }
};

module.exports = verifyToken;
