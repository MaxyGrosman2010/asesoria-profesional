const mercadopago = require('mercadopago');
require('dotenv').config();
const MP_ACCES_TOKEN = process.env.MP_ACCES_TOKEN;

mercadopago.configure({
  access_token: MP_ACCES_TOKEN,
});

function createPreference(description, price, quantity) {
  return new Promise((resolve, reject) => {
    let preference = {
      items: [
        {
          title: description,
          unit_price: Number(price),
          quantity: Number(quantity),
        },
      ],
      back_urls: {
        success: 'http://localhost:3001/feedback',
        failure: 'http://localhost:3001/feedback',
        pending: 'http://localhost:3001/feedback',
      },
      auto_return: 'approved',
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        resolve(response.body.init_point);
        //resolve(response.body.id);
        // console.log(response);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      });
  });
}

module.exports = {
  createPreference,
};
