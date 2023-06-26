const { Router } = require('express');
const getRouter = Router();
const {
  getServiceHandler,
  getServiceByIdHandler,
} = require('../handlers/getServiceHandler');

require('../middlewares/passport');

getRouter.get('services/all', getServiceHandler);
getRouter.get('services/:id', getServiceByIdHandler);

module.exports = getRouter;
