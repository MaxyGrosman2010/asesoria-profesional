const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Service',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      files: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userIsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userIsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    { timestamps: false }
  );
};
