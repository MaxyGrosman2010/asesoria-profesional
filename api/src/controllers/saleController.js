const { User, Sale, SoldService } = require('../db');
const sendEmailNotification = require('../utils/senderMail');
const fs = require('fs');
const path = require('path');
const templateCreation = require('../utils/templateCreation');
const { log } = require('console');

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
    const sellerIds = items.map((item) => item.seller_id);

    try {
      user = await User.findByPk(buyer_id);
      if (!user) {
        throw new Error('Comprador no encontrado');
      }
    } catch (error) {
      throw new Error('Error al buscar al comprador en la base de datos');
    }

    const buyerName = user.name;
    const sellerEmails = [];

    for (const sellerId of sellerIds) {
      try {
        const seller = await User.findByPk(sellerId);
        if (seller && seller.email) {
          sellerEmails.push(seller.email);
        }
      } catch (error) {
        console.error(
          'Error al buscar el vendedor en la base de datos:',
          error
        );
      }
    }

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

    const filePathCompra = path.join(
      __dirname,
      '..',
      'views',
      'buyNotification.hbs'
    );
    const filePathVenta = path.join(
      __dirname,
      '..',
      'views',
      'saleNotification.hbs'
    );

    const templateCompra = fs.readFileSync(filePathCompra, 'utf-8');
    const templateVenta = fs.readFileSync(filePathVenta, 'utf-8');

    const compiledTemplateCompra = templateCreation(templateCompra, {
      sale_id: newSale.id,
      buyer_name: buyerName,
      totalAmount: newSale.totalAmount,
      payment_id: newSale.payment_id,
      status: newSale.status,
      sellerEmails: sellerEmails,
    });

    const compiledTemplateVenta = templateCreation(templateVenta, {
      sale_id: newSale.id,
      buyer_name: buyerName,
      totalAmount: newSale.totalAmount,
      sellerEmails: sellerEmails,
    });

    const uniqueSellerEmails = [...new Set(sellerEmails)];

    try {
      await sendEmailNotification(
        typeNotification,
        user.email,
        compiledTemplateCompra
      );
      console.log(uniqueSellerEmails);
      for (const sellerEmail of uniqueSellerEmails) {
        await sendEmailNotification(
          'vendedor', // Tipo de notificación para los vendedores
          sellerEmail, // Correo electrónico del vendedor
          compiledTemplateVenta // Puedes crear una plantilla diferente para los vendedores si es necesario
        );
      }
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
