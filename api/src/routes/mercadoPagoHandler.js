const { Sale, SoldService, User, Service, TypeService } = require('../db');
const mercadopago = require('../controllers/mercadopagoController');
const { processSale } = require('../controllers/saleController');
let datosBody = [];

function createPreference(req, res) {
  const body = req.body[0];
  datosBody = req.body;
  mercadopago
    //.createPreference(description, price, quantity) LO PIDE MERCADOLIBRE
    .createPreference('SERVICIOS VARIOS', body.totalAmount, body.quantity)
    .then((preferenceId) => {
      res.json({ id: preferenceId });
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
    /*const { payment_id, status, merchant_order_id } = req.query;
    const { seller_id, buyer_id, service_ids, price, quantity } = datosBody;

    const paymentData = {
      payment_id,
      status,
      merchant_order_id,
      seller_id,
      buyer_id,
      price,
      quantity,
    };*/
    // console.log(req.query);
    // console.log(datosBody);

    const { query } = req;
    const { payment_id, status, merchant_order_id } = query;
    const items = datosBody;

    // Verifica si el comprador existe antes de crear la venta
    /*const buyer = await User.findOne({ where: { items.: buyer_id } });
    if (!buyer) {
      console.error('Buyer not found');
      res.status(404).send('Buyer not found');
      return;
    }*/

    await processSale(items, payment_id, status, merchant_order_id);

    /*    const newSale = await Sale.create(paymentData);

    for (const serviceData of service_ids) {
      const { service_id, seller_id } = serviceData;
      const service = await Service.findOne({ where: { id: service_id } });

      const soldService = await SoldService.create({
        saleId: newSale.id,
        serviceId: service_id,
        seller_id: seller_id,
      });
    }*/
    res.status(200).json({ message: 'Venta registrada exitosamente' });
  } catch (error) {
    console.error('Error al registrar la venta:', error);
    res.status(500).json({ error: 'Error al registrar la venta' });
  }
}

/*

    res.status(200).send(`Feedback received and processed successfully.`);
  } catch (error) {
    console.error('Error processing feedback:', error);
    res.status(500).send('Error processing feedback.');
  }
}
*/
module.exports = { createPreference, getFeedback };
