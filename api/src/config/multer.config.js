const multer = require("multer");

//Creamos la instancia de Multer para singUp
const uploadSingUp = multer({ storage: multer.memoryStorage() }).single(
  "profilePict"
);

const uploadCreateService = multer({ storage: multer.memoryStorage() }).single(
  "files"
);


module.exports = { uploadSingUp, uploadCreateService };