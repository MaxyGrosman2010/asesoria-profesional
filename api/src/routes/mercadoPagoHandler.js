const mercadopago = require('../controllers/mercadopagoController');

function createPreference(req, res) {
  const { description, price, quantity } = req.body;
  mercadopago
    .createPreference(description, price, quantity)
    .then((preferenceId) => {
      res.json({ id: preferenceId });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create preference' });
    });
}

function getFeedback(req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
}

module.exports = { createPreference, getFeedback };
