const { Router } = require('express');
const getRouter = Router();
const {
  getServiceHandler,
  getServiceByIdHandler,
} = require('../handlers/getServiceHandler');
const verifyToken = require("../middleware/verifyToken");

getRouter.get('services/all',verifyToken, getServiceHandler);
getRouter.get('services/:id',verifyToken, getServiceByIdHandler);

module.exports = getRouter;
