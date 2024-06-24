require('dotenv').config();  // Carga las variables de entorno.
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env  // Variables de entorno del archivo .env.


//* A continuación se deberian importar los modelos.

// Configuración de sequelize.
const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    { logging: false, native: false }
);

//* A continuación se deben ejecutar los modelos, pasandole por parametro a sequelize.

//* A continuación se debe relacionar los modelos.

module.exports = {
    conn: sequelize
}