const { Sale, SoldService } = require('../db');

async function processSale(items, payment_id, status, merchant_order_id) {
  console.log(items);
  try {
    const { totalAmount } = items[0];

    const newSale = await Sale.create({
      buyer_id: items[0].buyer_Id[0],
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

    console.log('Venta registrada exitosamente');
  } catch (error) {
    console.error('Error al registrar la venta:', error);
  }
}

module.exports = {
  processSale,
};
