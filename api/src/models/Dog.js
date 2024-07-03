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
                notEmpty: true  // El nombre no puede estar vacío.
            }
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true  // El nombre no puede estar vacío.
            }
        },
        life_span: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true  // El nombre no puede estar vacío.
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