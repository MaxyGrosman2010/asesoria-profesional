const nodemailer = require("nodemailer");
let { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

const sendEmailNotification = async (typeNotification, emailToSend) => {
  try {
    const config = {
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    };

    let message = "";

    if (typeNotification === "userCreation") {
      message = {
        from: EMAIL_USER,
        to: emailToSend,
        subject: "correo de prueba",
        text: "envio de creacion de usuario",
      };
    } else if (typeNotification === "serviceCreation") {
      message = {
        from: EMAIL_USER,
        to: emailToSend,
        subject: "correo de prueba",
        text: "envio de creacion de servicio",
      };
    }

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(message);

    console.log("msg from sendEmailNotification => " + info.accepted[0]);

    return info.accepted[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmailNotification;
