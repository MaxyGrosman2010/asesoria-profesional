const { app } = require("../config/firebase.config.js");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const firebaseUploader = async (file) => {
  try {
    //inicializamos firebase con app
    app;
    const storage = getStorage();
    const { originalname, buffer, mimetype } = file;

    const storageRef = ref(
      storage,
      `gs://pfhenry-f1185.appspot.com/${originalname}`
    );

    // Creamos el archivo meta-data incluyendo el content type
    const metadata = {
      contentType: mimetype,
    };
    // subimos el archivos al bucket storage
    const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);

    // Obtenemos la URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(downloadURL);
    return downloadURL;
  } catch (error) {
    console.log(error);
  }
};

module.exports = firebaseUploader;
