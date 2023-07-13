const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    payment_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    merchant_order_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
