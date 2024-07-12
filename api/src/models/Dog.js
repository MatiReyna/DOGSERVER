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
            allowNull: false,
            validate: {
                notEmpty: true  // El nombre no puede estar vacío.
            }
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,  // El nombre no puede estar vacío.
                is: /^[0-9]+(-[0-9]+)? cm$/  // Validación para formato de altura, p.ej. '30-40 cm'.
            }
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,  // El nombre no puede estar vacío.
                is: /^[0-9]+(-[0-9]+)? kg$/  // Validación para formato de peso, p.ej. '15-20 kg'.
            }
        },
        life_span: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,  // El nombre no puede estar vacío.
                is: /^[0-9]+(-[0-9]+)? years$/  // Validación para formato de vida, p.ej. '10-12 years'.
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true  // La imagen debe ser una URL válida.
            }
        },
        from: {
            type: DataTypes.STRING,
            defaultValue: 'DB',  // Se establece un valor predeterminado, sino se le proporciona uno.
            validate: {
                isIn: [['DB', 'API']]  // 'from' solo puede ser 'DB' o 'API'.
            }
        }
    }, { timestamps: false })  //TODO: OBJETO DE OPCIONES QUE DESACTIVA LA CREACION AUTOMATICA DE CAMPOS.
};