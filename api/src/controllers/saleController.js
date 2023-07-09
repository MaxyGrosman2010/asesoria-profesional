const { User, Sale, SoldService } = require('../db');

const sendEmailNotification = require('../utils/senderMail');
const fs = require('fs');
const path = require('path');
const templateCreation = require('../utils/templateCreation');
const typeNotification = 'compra/venta';
async function processSale(
  items,
  payment_id,
  status,
  merchant_order_id,
  typeNotification
) {
  try {
    const { totalAmount, buyer_id } = items[0];

    let user;
    try {
      user = await User.findByPk(buyer_id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      throw new Error('Error al buscar el usuario en la base de datos');
    }

    const buyerName = user.name;

    let newSale;
    try {
      newSale = await Sale.create({
        buyer_id: buyer_id,
        totalAmount: totalAmount,
        payment_id: payment_id,
        status: status,
        merchant_order_id: merchant_order_id,
      });
    } catch (error) {
      throw new Error('Error al crear la venta en la base de datos');
    }

    for (const item of items) {
      try {
        const { seller_id, item_id } = item;

        await SoldService.create({
          sale_id: newSale.id,
          service_id: item_id,
          seller_id: seller_id,
        });
      } catch (error) {
        throw new Error(
          'Error al crear el registro de servicio vendido en la base de datos'
        );
      }
    }

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

    try {
      await sendEmailNotification(
        typeNotification,
        user.email,
        compiledTemplate
      );
    } catch (error) {
      console.error(
        'Error al enviar el correo electrónico de notificación:',
        error
      );
    }

    console.log('Venta registrada exitosamente');
  } catch (error) {
    console.error('Error al registrar la venta:', error);
  }
}

module.exports = {
  processSale,
};
