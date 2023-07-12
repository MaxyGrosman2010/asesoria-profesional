const sendEmailNotification = require("../utils/senderMail");

const contactUsHandler = async (req, res) => {
  try {
      const { name, email, message } = req;
      await sendEmailNotification(typeNotification= undefined,email, name, message);

      return res.status(200).json({msg: "mensaje enviado"});
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = changeAdminPrivilages;
