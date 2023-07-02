const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('UserSale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};
