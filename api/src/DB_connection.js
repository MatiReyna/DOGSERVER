require('dotenv').config();  // Carga las variables de entorno.
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env  // Variables de entorno del archivo .env.


//* A continuación se deberian importar los modelos.
const dogModel = require('./models/Dog');
const temperamentModel = require('./models/Temperament');

// Configuración de sequelize.
const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    { logging: false, native: false }
);

//* A continuación se deben ejecutar los modelos, pasandole por parametro a sequelize.
dogModel(sequelize);
temperamentModel(sequelize);

//* A continuación se debe relacionar los modelos.
const { Dog, Temperament } = sequelize.models;

Dog.belongsToMany(Temperament, { through: 'dog_temperament' });
Temperament.belongsToMany(Dog, { through: 'dog_temperament' });

module.exports = {
    conn: sequelize,
    Dog,
    Temperament
}