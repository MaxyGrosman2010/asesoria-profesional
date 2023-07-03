const { Router } = require('express');
const { Op } = require('sequelize');
const { Service } = require('../db');
const router = Router();
const verifyToken = require("../middleware/verifyToken");

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
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;