const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Temperament', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true  // El nombre no puede estar vacío.
            }
        }
    }, { timestamps: false })  //TODO: OBJETO DE OPCIONES QUE DESACTIVA LA CREACION AUTOMATICA DE CAMPOS.
};