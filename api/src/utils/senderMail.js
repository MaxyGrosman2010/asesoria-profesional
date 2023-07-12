const nodemailer = require('nodemailer');
let { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

const sendEmailNotification = async (
  typeNotification,
  emailToSend,
  compiledTemplate
) => {
  try {
    const config = {
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    };

    let message = {};

    if (typeNotification === 'userCreation') {
      console.log(emailToSend);
      message = {
        from: EMAIL_USER,
        to: emailToSend,
        subject: 'correo de prueba',
        html: compiledTemplate,
      };
    } else if (typeNotification === 'serviceCreation') {
      message = {
        from: EMAIL_USER,
        to: emailToSend,
        subject: 'correo de prueba',
        text: 'envio de creacion de servicio',
      };
    } else if (typeNotification === 'compra/venta') {
      message = {
        from: EMAIL_USER,
        to: emailToSend,
        subject: 'Notificación de Compra/Venta',
        html: compiledTemplate,
      };
    } else if (typeNotification === 'vendedor') {
      // Agregar esta condición para el tipo "vendedor"
      message = {
        from: EMAIL_USER,
        to: emailToSend,
        subject: 'Notificación de Venta',
        html: compiledTemplate,
      };
    } else if (!typeNotification) {
       message = {
         from: EMAIL_USER,
         to: emailToSend,
         subject: "Contacto",
         message: compiledTemplate,
       };
    } else {
      throw new Error("Tipo de notificación no válido");
    }

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(message);

    console.log('msg from sendEmailNotification => ' + info.accepted[0]);

    return info.accepted[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmailNotification;
