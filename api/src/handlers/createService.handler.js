const createServiceController = require('../controllers/createService.controller');
const findTypeService = require('../controllers/findTypeService.controller');
const linkTypeserviceService = require('../controllers/linkTypeserviceService.controller');
const { validationResult } = require('express-validator');
const findUserById = require('../controllers/findUserById.controller');
const linkServiceUser = require('../controllers/linkServiceUser.controller');
const sendEmailNotification = require('../utils/senderMail');
const findServiceById = require('../controllers/serviceById.controller');
const { SERVICE_CREATION } = process.env;

const createService = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new Error(errors.throw());

    const {
      user_id = req.id,
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

    await linkServiceUser(existUser, newService);

    sendEmailNotification(SERVICE_CREATION, email);

    const info = await findServiceById(newService?.id);

    const {type} = info?.TypeServices[0];

    const response = {
      id: info?.id,
      name: info?.name,
      price: info?.price,
      description: info?.description,
      files: info?.files,
      user_id: info?.user_id,
      typeService: type
    };

    return res.status(200).json(response);
  } catch (error) {

    console.log(error);
    res.status(422).json(error);

  };
};

module.exports = createService;