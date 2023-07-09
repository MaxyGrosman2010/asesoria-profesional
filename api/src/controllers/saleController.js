const { User, Sale, SoldService } = require('../db');

const sendEmailNotification = require('../utils/senderMail');
const fs = require('fs');
const path = require('path');
const templateCreation = require('../utils/templateCreation');

async function processSale(items, payment_id, status, merchant_order_id) {
  //console.log('linea 9', items);
  try {
    const { totalAmount, buyer_id } = items[0];

    const user = await User.findByPk(buyer_id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const buyerName = user.name;

    const newSale = await Sale.create({
      buyer_id: buyer_id,
      totalAmount: totalAmount,
      payment_id: payment_id,
      status: status,
      merchant_order_id: merchant_order_id,
    });

    // Asentando los datos en la tabla SoldService
    for (const item of items) {
      const { seller_id, item_id } = item;

      await SoldService.create({
        sale_id: newSale.id,
        service_id: item_id,
        seller_id: seller_id,
      });
    }

    // Envío de correo electrónico de notificación
    const filePath = path.join(
      __dirname,
      '..',
      'views',
      'saleNotification.hbs'
    );
    const templateVenta = fs.readFileSync(filePath, 'utf-8');
    const compiledTemplate = templateCreation(templateVenta, {
      sale_id: newSale.id,
      buyer_name: buyerName,
      totalAmount: newSale.totalAmount,
      payment_id: newSale.payment_id,
      status: newSale.status,
    });
    await sendEmailNotification('compra/venta', user.email, compiledTemplate);

    console.log('Venta registrada exitosamente');
  } catch (error) {
    console.error('linea 57 controller: Error al registrar la venta:', error);
  }
}

module.exports = {
  processSale,
};
