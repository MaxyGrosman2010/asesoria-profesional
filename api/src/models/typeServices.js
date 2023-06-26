const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('TypeService',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrment: true,
            allowNull: false,
            unique: true
        },
        type: {
            type: DataTypes.ENUM(
                'Gastronomia',
                'Legal',
                'Medicina', 
                'Automotor', 
                'Construcción', 
                'Educacion', 
                'Tech', 
                'Otros'),
                allowNull: false
        }
    });
};