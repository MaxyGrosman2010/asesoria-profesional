const createServiceController = require('../controllers/createService.controller');
const findTypeService = require('../controllers/findTypeService.controller');
const linkTypeserviceService = require('../controllers/linkTypeserviceService.controller');
const { validationResult } = require('express-validator');
const findUserById = require('../controllers/findUserById.controller');
const linkServiceUser = require('../controllers/linkServiceUser.controller');
const sendEmailNotification = require('../utils/senderMail');
const { User } = require('../db');
const { SERVICE_CREATION } = process.env;

const createService = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new Error(errors.throw());

    const {
      user_id = req.User_id,
      name,
      typeService,
      price,
      description,
      email = req.email,
    } = req.body;

    const existUser = await findUserById(user_id);

    if (!existUser)
      return res
        .status(404)
        .json({ message: 'The id of the user send is invalid' });

    const existTypeService = await findTypeService(typeService);

    const newService = await createServiceController(user_id, name, price, description, req.file);

    await linkTypeserviceService(existTypeService, newService);

    const result = await linkServiceUser(existUser, newService);

    sendEmailNotification(SERVICE_CREATION, email);

    res.status(200).json({ message: 'servicio creado con exito' });
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
};

module.exports = createService;
