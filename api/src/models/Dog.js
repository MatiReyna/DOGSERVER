const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Dog', {
        id: {
            type: DataTypes.UUID,  // Genera un ID aleatorio único.
            defaultValue: DataTypes.UUIDV4,  // Un identificador universal único predeterminado, siguiendo el estandar UUID V4.
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,  // El nombre de cada perro es único.
            allowNull: false
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        life_span: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        from: {
            type: DataTypes.STRING,
            defaultValue: 'DB'  // Se establece un valor predeterminado, sino se le proporciona uno.
        }
    }, { timestamps: false })  //TODO: OBJETO DE OPCIONES QUE DESACTIVA LA CREACION AUTOMATICA DE CAMPOS.
};