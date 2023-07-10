const { processSale } = require('../controllers/saleController');
const mercadopago = require('../controllers/mercadopagoController');

const typeNotification = 'compra/venta';
let datosBody = [];

function createPreference(req, res) {
  console.log(`prueba 1 linea 7`);
  datosBody = req.body.map((elem) => {
    return { ...elem, buyer_id: req.id };
  });

  const body = req.body[0];
  mercadopago
    //.createPreference(description, price, quantity)
    .createPreference('SERVICIOS VARIOS', body.totalAmount, body.quantity)
    .then((preferenceId) => {
      // console.log('linea 17');
      res.json({ id: preferenceId });
      //console.log(`linea 15`, datosBody);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create preference' });
    });
}

async function getFeedback(req, res) {
  try {
    const { query } = req;
    const { payment_id, status, merchant_order_id } = query;
    const items = datosBody;

    await processSale(
      items,
      payment_id,
      status,
      merchant_order_id,
      typeNotification
    );

    res.status(200).json({ message: 'Venta registrada exitosamente' });
  } catch (error) {
    console.error('linea 36 handler: Error al registrar la venta:', error);
    res.status(500).json({ error: 'Error al registrar la venta linea 37' });
  }
}

module.exports = { createPreference, getFeedback };
