const dotenv = require('dotenv');
dotenv.config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_TABLE } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_TABLE}`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Sale, User, Service, TypeService, SoldService } = sequelize.models;

//!RELACIONES DE VENTAS
Sale.belongsTo(User, { as: 'seller', foreignKey: 'seller_id' });
Sale.belongsTo(User, { as: 'buyer', foreignKey: 'buyer_id' });

SoldService.belongsTo(User, { foreignKey: 'seller_id' });
User.hasMany(SoldService, { foreignKey: 'seller_id' });

Sale.belongsTo(User, { foreignKey: 'buyer_id' });
User.hasMany(Sale, { as: 'buyer', foreignKey: 'buyer_id' });
// Relación entre Sale y Service a través de SaleService
Sale.belongsToMany(Service, { through: SoldService, foreignKey: 'sale_id' });
Service.belongsToMany(Sale, { through: SoldService, foreignKey: 'service_id' });

//! REVISAR
Sale.hasMany(SoldService, { foreignKey: 'sale_id' });
SoldService.belongsTo(Sale, { foreignKey: 'sale_id' });
SoldService.belongsTo(Service, { foreignKey: 'service_id' });
Service.hasMany(SoldService, { foreignKey: 'service_id' });

Service.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Service, { foreignKey: 'user_id' });

Service.belongsToMany(TypeService, { through: 'TypesOfService' });
TypeService.belongsToMany(Service, { through: 'TypesOfService' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
