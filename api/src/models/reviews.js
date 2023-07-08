const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      score: {
        type: DataTypes.INTEGER
      }
    },
    { timestamps: false }
  );
};
