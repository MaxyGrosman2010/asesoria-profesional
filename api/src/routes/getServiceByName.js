const { Router } = require('express');
const { Op } = require('sequelize');
const { Service } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const { name } = req.query;

    // BUSQUEDA SIN MAYUS NI MINUS
    const services = await Service.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        
      },
    });

    const halfway = services?.filter((service) => !service?.isDeleted);

    const response = halfway?.filter((service) => !service?.userIsDeleted);

    res.status(200).json(response);

  } catch (error) {

    res.status(500).json({ error: 'Internal server error' });

  }
});

module.exports = router;