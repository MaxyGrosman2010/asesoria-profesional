const { Sequelize } = require('sequelize');
const { Sale, UserSale, User, Service, TypeService } = require('../db');
const mercadopago = require('../controllers/mercadopagoController');

let datosBody = {};

function createPreference(req, res) {
  const { description, price, quantity, seller_id, buyer_id, service_id } =
    req.body;
  datosBody = { seller_id, buyer_id, service_id, price, quantity };
  mercadopago
    .createPreference(description, price, quantity)
    .then((preferenceId) => {
      res.json({ id: preferenceId });
      //console.log(`linea 15`, datosBody);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create preference' });
    });
}

/*
function getFeedback(req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
}*/
async function getFeedback(req, res) {
  try {
    const { payment_id, status, merchant_order_id } = req.query;
    const { seller_id, buyer_id, service_id, price, quantity } = datosBody;

    const paymentData = {
      payment_id,
      status,
      merchant_order_id,
      seller_id,
      buyer_id,
      service_id,
      price,
      quantity,
    };

    // Verifica si el comprador existe antes de crear la venta
    const buyer = await User.findOne({ where: { id: buyer_id } });

    if (!buyer) {
      console.error('Buyer not found');
      res.status(404).send('Buyer not found');
      return;
    }

    const newSale = await Sale.create(paymentData);

    res.status(200).send(`Feedback received and processed successfully.`);
  } catch (error) {
    console.error('Error processing feedback:', error);
    res.status(500).send('Error processing feedback.');
  }
}

module.exports = { createPreference, getFeedback };
