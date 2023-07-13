const { User, Sale, SoldService } = require('../db');

const logicalSoldServiceByUser = async (req, res) => {
  try {
    // Paso 1: Buscar el usuario por su ID y obtener el objeto User
    const user = await User.findByPk(req.id);

    // Si no se encuentra el usuario, enviar una respuesta de error
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Paso 2: Obtener todas las ventas del usuario
    const sales = await Sale.findAll({
      where: {
        buyer_id: req.id,
      },
    });

    // Paso 3: Obtener los servicios vendidos para cada venta

    const soldServicesBySale = await Promise.all(
      sales.map(async (sale) => {
        const soldServices = await SoldService.findAll({
          where: {
            sale_id: sale.id,
          },
          include: [
            {
              model: Service,
              attributes: ['name', 'price', 'files'], // Agrega los atributos 'name' y 'price' del modelo Service
            },
          ],
        });
        return {
          saleId: sale.id,
          soldServices,
        };
      })
    );
    /*    const soldServicesBySale = [];
    for (const sale of sales) {
      const soldServices = await SoldService.findAll({
        where: {
          sale_id: sale.id,
        },
        include: [
          {
            model: Service,
            attributes: ['name', 'price', 'files'],
          },
        ],
      });

      soldServicesBySale.push({
        saleId: sale.id,
        soldServices,
      });
    } */
    // Paso 4: Formatear y enviar la respuesta
    const response = {
      soldServicesBySale: soldServicesBySale.map((sale) => ({
        soldServices: sale.soldServices.map((soldService) => ({
          id: soldService.id,
          name: soldService.Service.name,
          price: soldService.Service.price,
          photo: soldService.Service.files,
        })),
      })),
    };

    res.json(response);
  } catch (error) {

    res
      .status(500)
      .json({ message: 'Error al obtener las compras del usuario' });
  }
};

module.exports = logicalSoldServiceByUser;
