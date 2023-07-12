const sendEmailNotification = require("../utils/senderMail");

const contactUsHandler = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const desc =
      "Nombre: " +
      name +
      "\n" +
      "Email de contacto: " +
      email +
      "\n" +
      "Mensaje: " +
      message;
    await sendEmailNotification(
      (typeNotification = undefined),
      (emailToSend = undefined),
      desc
    );

    return res.status(200).json({ msg: "mensaje enviado" });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = contactUsHandler;
